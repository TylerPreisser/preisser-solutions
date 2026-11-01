"use client";

import { Component, type ReactNode } from "react";

/**
 * If the showcase chunk or anything inside it fails (a dropped connection
 * mid-deploy, an old tab after a new deploy), the window simply does not open.
 * Without this, one failed lazy import would unmount the home page's tree.
 */
export class ShowcaseBoundary extends Component<{ children: ReactNode; onFail: () => void }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFail();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
