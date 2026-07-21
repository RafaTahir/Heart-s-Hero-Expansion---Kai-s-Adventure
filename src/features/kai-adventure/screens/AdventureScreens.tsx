import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, ChevronRight, Compass, Gem, RotateCcw, Sparkles } from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import { questPacks } from "../content/questPacks";
import { SceneFrame } from "../components/SceneFrame";
import { useAdventure } from "../engine/AdventureContext";
import type { QuestPack, QuestScene, RegionId, TextVariant } from "../engine/types";
import { KaiWorldArt } from "../art/KaiWorldArt";

const regionNames: Record<RegionId, string> = {
  "mountain-of-echoes": "Mountain of Echoes",
  "whispering-woods": "Whispering Woods",
  "bridge-of-falling-stars": "Bridge of Falling Stars",
};

function isRegionId(value: string | undefined): value is RegionId {
  return value === "mountain-of-echoes" || value === "whispering-woods" || value === "bridge-of-falling-stars";
}

function readText(value: TextVariant, ageBand?: "6-7" | "8-9" | "10-11"): string {
  return ageBand && value.ageBands?.[ageBand] ? value.ageBands[ageBand] : value.default;
}

function useSelectedPack(regionId: string | undefined): QuestPack | undefined {
  const { progress } = useAdventure();
  if (!isRegionId(regionId)) return undefined;
  const selectedId = progress.selectedQuestIds[regionId];
  return questPacks.find((pack) => pack.id === selectedId) ?? questPacks.find((pack) => pack.regionId === regionId);
}

function dayLabel(scene: QuestScene, length: string | undefined): string | undefined {
  if (length !== "three-day") return undefined;
  if (scene.type === "narrative" || scene.type === "choice") return "Day 1 · Discover";
  if (scene.type === "mission") return "Day 3 · Do";
  return undefined;
}

export function QuestScreen() {
  const { regionId, sceneId } = useParams();
  const navigate = useNavigate();
  const { progress, ready, dispatch, virtueLexicon } = useAdventure();
  const pack = useSelectedPack(regionId);
  const [reaction, setReaction] = useState("");
  const scene = pack?.scenes.find((item) => item.id === sceneId);

  useEffect(() => setReaction(""), [sceneId]);

  useEffect(() => {
    if (!pack || !scene || !isRegionId(regionId) || !ready) return;
    if (progress.restoredRegionIds.includes(regionId)) return;
    if (progress.activeRun?.questId !== pack.id) dispatch({ type: "quest-started", questId: pack.id, sceneId: scene.id, regionId });
  }, [dispatch, pack, progress.activeRun?.questId, progress.restoredRegionIds, ready, regionId, scene]);

  if (!ready) return <LoadingTrail />;
  if (!progress.setup) return <Navigate to="/setup" replace />;
  if (!pack || !scene || !isRegionId(regionId)) return <Navigate to="/map" replace />;
  if (scene.type === "mission") return <Navigate to={`/mission/${regionId}`} replace />;
  if (scene.type === "transformation") return <Navigate to={`/transform/${regionId}`} replace />;
  if (scene.type === "reward") return <Navigate to={`/reward/${regionId}`} replace />;

  const advance = (nextSceneId: string, choiceId?: string) => {
    dispatch({ type: "scene-advanced", sceneId: nextSceneId, choiceId });
    const next = pack.scenes.find((item) => item.id === nextSceneId);
    const nextPath = next?.type === "mission" ? `/mission/${regionId}` : `/quest/${regionId}/${nextSceneId}`;
    navigate(nextPath);
  };

  const choose = (choice: Extract<QuestScene, { type: "choice" }>["choices"][number]) => {
    setReaction(readText(choice.reaction, progress.setup?.ageBand));
    window.setTimeout(() => advance(choice.nextSceneId, choice.id), window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 420);
  };

  return (
    <SceneFrame title={readText(scene.title, progress.setup.ageBand)} eyebrow={dayLabel(scene, progress.setup.journeyLength) ?? `${regionNames[regionId]} · ${virtueLexicon.label(pack.virtueId)}`} art={<QuestArt regionId={regionId} restored={false} />}>
      <p className="kai-caption">{reaction || readText(scene.body, progress.setup.ageBand)}</p>
      {scene.type === "narrative" ? (
        <button className="kai-button kai-button--primary" type="button" onClick={() => advance(scene.nextSceneId)}>Step closer <ChevronRight aria-hidden="true" /></button>
      ) : (
        <div className="kai-scene-choices" aria-label="Choose how Kai responds">
          {scene.choices.map((choice) => <button className="kai-choice-button" type="button" key={choice.id} onClick={() => choose(choice)} disabled={Boolean(reaction)}><Sparkles aria-hidden="true" />{readText(choice.label, progress.setup?.ageBand)}</button>)}
        </div>
      )}
      <Link className="kai-back-link" to="/map"><ArrowLeft aria-hidden="true" /> Map</Link>
    </SceneFrame>
  );
}

export function MissionScreen() {
  const { regionId } = useParams();
  const navigate = useNavigate();
  const { progress, ready, dispatch, virtueLexicon } = useAdventure();
  const pack = useSelectedPack(regionId);
  const scene = pack?.scenes.find((item) => item.type === "mission");
  if (!ready) return <LoadingTrail />;
  if (!progress.setup) return <Navigate to="/setup" replace />;
  if (!pack || !scene || !isRegionId(regionId)) return <Navigate to="/map" replace />;
  const status = progress.missions[pack.id]?.status ?? "not-started";
  const accept = () => dispatch({ type: "mission-accepted", questId: pack.id });
  const complete = () => {
    const transformation = pack.scenes.find((item) => item.type === "transformation");
    if (!transformation) return;
    dispatch({ type: "mission-completed", questId: pack.id, transformationSceneId: transformation.id });
    navigate(`/transform/${regionId}`);
  };
  return (
    <SceneFrame title={readText(scene.title, progress.setup.ageBand)} eyebrow={dayLabel(scene, progress.setup.journeyLength) ?? virtueLexicon.label(pack.virtueId)} art={<MissionArt regionId={regionId} />}>
      <p className="kai-mission-copy">{readText(scene.mission, progress.setup.ageBand)}</p>
      <p className="kai-caption">{readText(scene.reassurance, progress.setup.ageBand)}</p>
      <div className="kai-actions">
        {status === "not-started" ? <button className="kai-button kai-button--primary" type="button" onClick={accept}>I'll do it</button> : <button className="kai-button kai-button--primary" type="button" onClick={complete}>I did it <Check aria-hidden="true" /></button>}
        {status !== "not-started" ? <Link className="kai-button kai-button--quiet" to="/map">Back to Map</Link> : null}
      </div>
      <p className="kai-status-line" role="status">{status === "accepted" ? "Mission saved. Return whenever you are ready." : ""}</p>
    </SceneFrame>
  );
}

const courageBeats = ["Pip draws a light trail.", "The echoes soften.", "Storm clouds separate.", "Crystals answer the sunrise.", "Kai's compass awakens.", "The Courage Compass appears."];

export function TransformationScreen() {
  const { regionId } = useParams();
  const navigate = useNavigate();
  const { progress, ready, dispatch } = useAdventure();
  const pack = useSelectedPack(regionId);
  const [phase, setPhase] = useState(0);
  const [settled, setSettled] = useState(false);
  const reducedMotion = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);
  const transformation = pack?.scenes.find((item) => item.type === "transformation");
  const rewardScene = pack?.scenes.find((item) => item.type === "reward");

  useEffect(() => {
    if (!pack || !transformation || !rewardScene || !isRegionId(regionId) || !ready) return;
    dispatch({ type: "transformation-started" });
    if (reducedMotion) {
      setPhase(6);
      setSettled(true);
      dispatch({ type: "region-restored", questId: pack.id, regionId, rewardSceneId: rewardScene.id });
      return;
    }
    const timer = window.setInterval(() => {
      setPhase((current) => {
        const next = Math.min(current + 1, 6);
        if (next === 6) window.clearInterval(timer);
        return next;
      });
    }, 430);
    return () => window.clearInterval(timer);
  }, [dispatch, pack, ready, reducedMotion, regionId, rewardScene, transformation]);

  useEffect(() => {
    if (phase !== 6 || settled || !pack || !rewardScene || !isRegionId(regionId)) return;
    setSettled(true);
    dispatch({ type: "region-restored", questId: pack.id, regionId, rewardSceneId: rewardScene.id });
  }, [dispatch, pack, phase, regionId, rewardScene, settled]);

  if (!ready) return <LoadingTrail />;
  if (!progress.setup || !pack || !transformation || !rewardScene || !isRegionId(regionId)) return <Navigate to="/map" replace />;
  const skip = () => setPhase(6);
  return (
    <main className={`kai-transformation kai-transformation--${regionId}`} data-phase={phase} aria-labelledby="transform-heading">
      <TransformationArt regionId={regionId} phase={phase} />
      <section className="kai-transform-copy">
        <p className="kai-eyebrow">The world is changing</p>
        <h1 id="transform-heading">{phase === 6 ? `${regionNames[regionId]} restored` : readText(transformation.title)}</h1>
        <p className="kai-caption">{regionId === "mountain-of-echoes" ? courageBeats[Math.min(phase, 5)] : readText(transformation.body)}</p>
        <div className="kai-actions">
          {phase < 6 ? <button className="kai-button kai-button--quiet" type="button" onClick={skip}>Skip animation</button> : <button className="kai-button kai-button--primary" type="button" onClick={() => navigate(`/reward/${regionId}`)}>See reward <ChevronRight aria-hidden="true" /></button>}
        </div>
      </section>
      <p className="sr-only" aria-live="polite">{phase === 6 ? `${regionNames[regionId]} is restored.` : ""}</p>
    </main>
  );
}

export function RewardScreen() {
  const { regionId } = useParams();
  const { progress, ready, dispatch } = useAdventure();
  const pack = useSelectedPack(regionId);
  if (!ready) return <LoadingTrail />;
  if (!progress.setup || !pack || !isRegionId(regionId)) return <Navigate to="/map" replace />;
  const collected = progress.collectedRewardIds.includes(pack.reward.id);
  return (
    <SceneFrame title={readText(pack.reward.name)} eyebrow={`${regionNames[regionId]} restored`} art={<RewardArt regionId={regionId} />}>
      <p className="kai-caption">{readText(pack.reward.memory)}</p>
      <div className="kai-actions">
        {!collected ? <button className="kai-button kai-button--primary" type="button" onClick={() => dispatch({ type: "reward-collected", rewardId: pack.reward.id })}>Add to Collection <Sparkles aria-hidden="true" /></button> : <Link className="kai-button kai-button--primary" to="/map">Back to Map</Link>}
        <Link className="kai-button kai-button--quiet" to="/collection">View Collection</Link>
      </div>
      <p className="kai-status-line" role="status">{collected ? `${readText(pack.reward.name)} added to your collection.` : ""}</p>
    </SceneFrame>
  );
}

export function CollectionScreen() {
  const { progress, ready, virtueLexicon } = useAdventure();
  if (!ready) return <LoadingTrail />;
  return (
    <SceneFrame title="The hero collection" eyebrow="Three places for light" art={<CollectionArt />} tone="journal">
      <div className="kai-collection-list">
        {questPacks.map((pack) => {
          const found = progress.collectedRewardIds.includes(pack.reward.id);
          return <article className={found ? "kai-treasure is-found" : "kai-treasure"} key={pack.reward.id}><Gem aria-hidden="true" /><div><h2>{found ? readText(pack.reward.name) : "Not found yet"}</h2><p>{virtueLexicon.label(pack.virtueId)} · {regionNames[pack.regionId]}</p>{found ? <small>{readText(pack.reward.memory)}</small> : null}</div></article>;
        })}
      </div>
      <Link className="kai-button kai-button--primary" to="/map">Go to Map</Link>
    </SceneFrame>
  );
}

export function GrownUpScreen() {
  const { progress, ready } = useAdventure();
  if (!ready) return <LoadingTrail />;
  const completed = questPacks.filter((pack) => progress.completedQuestIds.includes(pack.id));
  return (
    <SceneFrame title="Grown-up journal" eyebrow="A quiet place to reflect" art={<KaiWorldArt variant="camp" />} tone="journal">
      <div className="kai-reflections">
        {completed.length ? completed.map((pack) => <p key={pack.id}><strong>{regionNames[pack.regionId]}:</strong> {readText(pack.parentPrompt)}</p>) : <p>Finish a region together to reveal a reflection prompt.</p>}
      </div>
      <div className="kai-actions">
        <Link className="kai-button kai-button--primary" to="/map">Back to Adventure</Link>
        <Link className="kai-button kai-button--quiet" to="/setup">Change setup</Link>
        <Link className="kai-button kai-button--danger" to="/reset"><RotateCcw aria-hidden="true" /> Reset adventure</Link>
      </div>
    </SceneFrame>
  );
}

export function ResetScreen() {
  const navigate = useNavigate();
  const { reset } = useAdventure();
  return (
    <SceneFrame title="Reset this adventure?" eyebrow="Grown-up confirmation" art={<KaiWorldArt variant="map" />}>
      <p className="kai-caption">This removes setup, missions, restored regions, and collectibles from this device. Other site data stays untouched.</p>
      <div className="kai-actions">
        <button className="kai-button kai-button--quiet" type="button" onClick={() => navigate(-1)}>Cancel</button>
        <button className="kai-button kai-button--danger" type="button" onClick={() => void reset()}>Reset adventure</button>
      </div>
    </SceneFrame>
  );
}

function LoadingTrail() {
  return <main className="kai-loading" aria-live="polite"><Compass aria-hidden="true" /><p>Finding your trail…</p></main>;
}

function QuestArt({ regionId, restored }: { regionId: RegionId; restored: boolean }) {
  return <div className={`kai-region-art kai-region-art--${regionId} ${restored ? "is-restored" : ""}`}><KaiWorldArt variant="map" /><div className="kai-region-art__veil" /></div>;
}

function MissionArt({ regionId }: { regionId: RegionId }) {
  return <div className="kai-mission-art"><QuestArt regionId={regionId} restored={false} /><div className="kai-mission-object"><Compass aria-hidden="true" /></div></div>;
}

function TransformationArt({ regionId, phase }: { regionId: RegionId; phase: number }) {
  return <div className="kai-transform-art" aria-hidden="true"><QuestArt regionId={regionId} restored={phase === 6} /><div className="kai-light-trail" /><div className="kai-echo-rings" /><div className="kai-sunrise-disc" /><div className="kai-crystal-field"><i /><i /><i /><i /></div><div className="kai-compass-awake"><Compass /></div><div className="kai-reward-reveal"><Gem /></div></div>;
}

function RewardArt({ regionId }: { regionId: RegionId }) {
  return <div className="kai-reward-art"><QuestArt regionId={regionId} restored /><Gem aria-hidden="true" /></div>;
}

function CollectionArt() {
  return <div className="kai-collection-art" aria-hidden="true"><KaiWorldArt variant="camp" /></div>;
}
