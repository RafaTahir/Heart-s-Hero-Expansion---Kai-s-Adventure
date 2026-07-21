import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Kai's Adventure encountered an unexpected error.", error, info);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
          <section className="max-w-md text-center" aria-labelledby="error-title">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">The path went quiet</p>
            <h1 id="error-title" className="font-display text-4xl font-bold">Kai needs a fresh start.</h1>
            <p className="mt-4 text-base text-muted-foreground">Reload the page to wake the adventure again.</p>
            <button
              type="button"
              className="mt-8 min-h-11 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              onClick={() => window.location.reload()}
            >
              Reload adventure
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
