import { useState, type FormEvent } from "react";
import { BookOpen, Check, ChevronRight, Compass, LockKeyhole, Sparkles, Star, Trees } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { KaiWorldArt } from "../art/KaiWorldArt";
import { SceneFrame } from "../components/SceneFrame";
import { useAdventure } from "../engine/AdventureContext";
import { selectQuest } from "../engine/selectQuest";
import type { AgeBand, ChallengeId, JourneyLength, RegionId } from "../engine/types";

export function OpeningScreen() {
  return (
    <SceneFrame title="Kai's world is losing its light." eyebrow="A Heart Hero Expansion" art={<KaiWorldArt />}>
      <p className="kai-caption">Help restore it, one brave act at a time.</p>
      <div className="kai-actions">
        <Link className="kai-button kai-button--primary" to="/setup">Begin Adventure <ChevronRight aria-hidden="true" /></Link>
        <Link className="kai-button kai-button--quiet" to="/grown-up">Grown-up</Link>
      </div>
    </SceneFrame>
  );
}

const ageChoices = [
  { value: "6-7", label: "Ages 6–7" },
  { value: "8-9", label: "Ages 8–9" },
  { value: "10-11", label: "Ages 10–11" },
] as const;

const challengeChoices = [
  { value: "fear", label: "Feeling worried" },
  { value: "confidence", label: "Building confidence" },
  { value: "sharing", label: "Sharing with others" },
  { value: "helping", label: "Helping someone" },
  { value: "giving-up", label: "Giving up" },
  { value: "frustration", label: "Feeling frustrated" },
] as const;

export function SetupScreen() {
  const navigate = useNavigate();
  const { dispatch, questSource } = useAdventure();
  const [age, setAge] = useState("");
  const [challenge, setChallenge] = useState("");
  const [length, setLength] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const missing = !age ? "Choose an age band." : !challenge ? "Choose what feels useful right now." : !length ? "Choose a journey length." : "";
    if (missing) {
      setError(missing);
      document.querySelector<HTMLElement>("fieldset:has(input:not(:checked)) legend")?.focus();
      return;
    }
    const setup = { ageBand: age as AgeBand, challengeId: challenge as ChallengeId, journeyLength: length as JourneyLength };
    const packs = await questSource.list();
    const regions: RegionId[] = ["mountain-of-echoes", "whispering-woods", "bridge-of-falling-stars"];
    const selectedQuestIds = Object.fromEntries(regions.flatMap((regionId) => {
      const selected = selectQuest(packs, regionId, setup.challengeId);
      return selected ? [[regionId, selected.id]] : [];
    }));
    dispatch({ type: "setup-saved", setup, selectedQuestIds });
    navigate("/map");
  }

  return (
    <main className="kai-scene kai-scene--journal">
      <div className="kai-scene__art"><KaiWorldArt variant="camp" /></div>
      <section className="kai-journal" aria-labelledby="setup-heading">
        <p className="kai-eyebrow">Grown-up setup · about one minute</p>
        <h1 id="setup-heading">Set the first trail</h1>
        <p>Choose what fits today. Nothing here is a test, and there are no timers.</p>
        <form onSubmit={(event) => void submit(event)} noValidate>
          <ChoiceGroup legend="How old is your explorer?" name="age" value={age} onChange={setAge} choices={ageChoices} />
          <ChoiceGroup legend="What would help today?" name="challenge" value={challenge} onChange={setChallenge} choices={challengeChoices} columns />
          <ChoiceGroup legend="Choose the pace" name="length" value={length} onChange={setLength} choices={[{ value: "quick", label: "Quick Quest" }, { value: "three-day", label: "Three-Day Adventure" }]} />
          {error ? <p className="kai-form-error" role="alert">{error}</p> : null}
          <button className="kai-button kai-button--primary" type="submit">Hand to Child <ChevronRight aria-hidden="true" /></button>
        </form>
      </section>
    </main>
  );
}

interface ChoiceGroupProps {
  legend: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  choices: readonly { value: string; label: string }[];
  columns?: boolean;
}

function ChoiceGroup({ legend, name, value, onChange, choices, columns }: ChoiceGroupProps) {
  return (
    <fieldset className="kai-choice-group">
      <legend tabIndex={-1}>{legend}</legend>
      <div className={columns ? "kai-choice-grid" : "kai-choice-row"}>
        {choices.map((choice) => (
          <label className="kai-radio" key={choice.value}>
            <input type="radio" name={name} value={choice.value} checked={value === choice.value} onChange={() => onChange(choice.value)} />
            <span>{choice.label}</span>
            <Check className="kai-radio__check" aria-hidden="true" />
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function MapScreen() {
  return (
    <main className="kai-map" aria-labelledby="map-heading">
      <div className="kai-map__art"><KaiWorldArt variant="map" /></div>
      <header className="kai-map__header">
        <p className="kai-eyebrow">The light is waiting</p>
        <h1 id="map-heading" tabIndex={-1}>Choose a path</h1>
      </header>
      <nav className="kai-region-nav" aria-label="Adventure regions">
        <Link className="kai-region kai-region--courage" to="/quest/mountain-of-echoes/arrival">
          <Compass aria-hidden="true" /><span><strong>Mountain of Echoes</strong><small>Courage · Enter region</small></span><ChevronRight aria-hidden="true" />
        </Link>
        <button className="kai-region kai-region--sleeping" type="button" disabled>
          <Trees aria-hidden="true" /><span><strong>Whispering Woods</strong><small>Sleeping · restore Courage first</small></span><LockKeyhole aria-hidden="true" />
        </button>
        <button className="kai-region kai-region--sleeping" type="button" disabled>
          <Star aria-hidden="true" /><span><strong>Bridge of Falling Stars</strong><small>Sleeping · restore Courage first</small></span><LockKeyhole aria-hidden="true" />
        </button>
      </nav>
      <div className="kai-map__utilities">
        <Link className="kai-button kai-button--quiet" to="/collection"><Sparkles aria-hidden="true" /> Collection</Link>
        <Link className="kai-button kai-button--quiet" to="/grown-up"><BookOpen aria-hidden="true" /> Grown-up</Link>
      </div>
    </main>
  );
}

export function FoundationPlaceholder({ title }: { title: string }) {
  return (
    <SceneFrame title={title} eyebrow="The next trail is being drawn" art={<KaiWorldArt variant="camp" />}>
      <p className="kai-caption">This path opens in the next build step.</p>
      <Link className="kai-button kai-button--primary" to="/map">Back to Map</Link>
    </SceneFrame>
  );
}
