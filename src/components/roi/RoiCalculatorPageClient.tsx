"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { roiJobRoles, type RoiJobRole } from "@/data/services";

interface RoleState {
  enabled: boolean;
  people: number;
  salary: number;
  benefits: number;
}

interface Results {
  totalLaborCost: number;
  automationSavings: number;
  monthlySavings: number;
  annualSavings: number;
  hoursFreedPerWeek: number;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function buildInitialState(roles: RoiJobRole[]): Record<string, RoleState> {
  return Object.fromEntries(
    roles.map((role) => [
      role.id,
      {
        enabled: false,
        people: role.defaultPeople,
        salary: role.defaultSalary,
        benefits: role.defaultBenefits,
      },
    ])
  );
}

function calculateResults(
  roleStates: Record<string, RoleState>,
  roles: RoiJobRole[]
): Results {
  let totalLaborCost = 0;
  let automationSavings = 0;

  roles.forEach((role) => {
    const state = roleStates[role.id];
    if (!state.enabled) return;

    const totalComp = (state.salary + state.benefits) * state.people;
    const savings = totalComp * role.automationPercentage;

    totalLaborCost += totalComp;
    automationSavings += savings;
  });

  // Approximate hours freed (assumes $25/hr equivalent)
  const hoursFreedPerWeek = Math.round(automationSavings / 25 / 52);

  return {
    totalLaborCost,
    automationSavings,
    monthlySavings: automationSavings / 12,
    annualSavings: automationSavings,
    hoursFreedPerWeek,
  };
}

export function RoiCalculatorPageClient() {
  const [roleStates, setRoleStates] = useState<Record<string, RoleState>>(() =>
    buildInitialState(roiJobRoles)
  );
  const [results, setResults] = useState<Results | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const updateRole = useCallback(
    (id: string, field: keyof RoleState, value: boolean | number) => {
      setRoleStates((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: value },
      }));
      // Reset results when inputs change
      if (hasCalculated) {
        setResults(null);
        setHasCalculated(false);
      }
    },
    [hasCalculated]
  );

  const handleCalculate = () => {
    const r = calculateResults(roleStates, roiJobRoles);
    setResults(r);
    setHasCalculated(true);
  };

  const anyEnabled = Object.values(roleStates).some((s) => s.enabled);

  return (
    <div className="ps-roi-page-wrapper">
      <div className="ps-container">
        {/* Hero */}
        <div className="ps-roi-hero">
          <span
            className="ps-eyebrow-dark"
            style={{ textAlign: "center", display: "block", marginBottom: "16px" }}
          >
            ROI Estimator
          </span>
          <h1 className="ps-roi-page-title">Estimate Your Automation ROI</h1>
          <p className="ps-roi-subtitle">
            Select the roles in your business that are burdened by repetitive manual work. We&apos;ll
            estimate how much time and money custom automation could save you each year.
          </p>
        </div>

        {/* Calculator form */}
        <div id="roiForm" role="form" aria-label="ROI Calculator">
          <p className="ps-roi-form-intro">
            Check the roles that apply, adjust headcount and compensation to match your situation, then
            click Calculate.
          </p>

          {roiJobRoles.map((role) => {
            const state = roleStates[role.id];
            return (
              <div
                key={role.id}
                className={`ps-job-role-item${state.enabled ? " active" : ""}`}
              >
                <div className="ps-job-role-header">
                  <input
                    type="checkbox"
                    id={`check-${role.id}`}
                    checked={state.enabled}
                    onChange={(e) => updateRole(role.id, "enabled", e.target.checked)}
                    aria-label={`Include ${role.label} in calculation`}
                  />
                  <label htmlFor={`check-${role.id}`}>{role.label}</label>
                </div>

                {state.enabled && (
                  <div className="ps-role-inputs">
                    <div className="ps-input-group">
                      <label htmlFor={`people-${role.id}`}>Number of people</label>
                      <input
                        type="number"
                        id={`people-${role.id}`}
                        min={1}
                        max={50}
                        value={state.people}
                        onChange={(e) =>
                          updateRole(role.id, "people", Math.max(1, parseInt(e.target.value) || 1))
                        }
                      />
                    </div>
                    <div className="ps-input-group">
                      <label htmlFor={`salary-${role.id}`}>Annual salary ($)</label>
                      <input
                        type="number"
                        id={`salary-${role.id}`}
                        min={0}
                        step={1000}
                        value={state.salary}
                        onChange={(e) =>
                          updateRole(role.id, "salary", Math.max(0, parseInt(e.target.value) || 0))
                        }
                      />
                    </div>
                    <div className="ps-input-group">
                      <label htmlFor={`benefits-${role.id}`}>Benefits cost/yr ($)</label>
                      <input
                        type="number"
                        id={`benefits-${role.id}`}
                        min={0}
                        step={500}
                        value={state.benefits}
                        onChange={(e) =>
                          updateRole(role.id, "benefits", Math.max(0, parseInt(e.target.value) || 0))
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div className="ps-roi-actions">
            <button
              className="ps-btn-primary"
              onClick={handleCalculate}
              disabled={!anyEnabled}
              style={{
                opacity: anyEnabled ? 1 : 0.5,
                cursor: anyEnabled ? "pointer" : "not-allowed",
                fontSize: "16px",
                padding: "14px 36px",
              }}
            >
              Calculate My Savings
            </button>
            {!anyEnabled && (
              <p style={{ marginTop: "10px", fontSize: "14px", color: "#697386" }}>
                Select at least one role above to get started.
              </p>
            )}
          </div>

          {/* Results */}
          {results && hasCalculated && (
            <div id="roiResults" role="region" aria-live="polite" aria-label="ROI Results">
              <h3>Your Estimated Annual Savings</h3>

              <div className="ps-result-item">
                <span className="label">Total annual labor cost (selected roles)</span>
                <span className="value">{formatCurrency(results.totalLaborCost)}</span>
              </div>

              <div className="ps-result-item savings">
                <span className="label">Estimated annual savings from automation</span>
                <span className="value">{formatCurrency(results.annualSavings)}</span>
              </div>

              <div className="ps-result-item monthly-savings">
                <span className="label">That&apos;s per month</span>
                <span className="value">{formatCurrency(results.monthlySavings)}</span>
              </div>

              <div className="ps-result-item">
                <span className="label">Estimated hours freed per week</span>
                <span className="value">~{results.hoursFreedPerWeek} hrs</span>
              </div>

              <p className="ps-roi-footer-note">
                Estimates are based on industry-average automation percentages for each role category.
                Actual results vary by business. Contact us for a personalized assessment.
              </p>

              <div style={{ textAlign: "center", marginTop: "24px" }}>
                <Link href="/contact" className="ps-btn-primary">
                  Get a Real Assessment
                  <span className="ps-btn-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
