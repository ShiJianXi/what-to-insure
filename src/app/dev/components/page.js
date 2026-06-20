'use client';

import { useState } from 'react';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import RadioGroup from '@/components/ui/RadioGroup';
import Slider from '@/components/ui/Slider';
import Tooltip from '@/components/ui/Tooltip';

const sectionStyle = {
  marginBottom: 'var(--space-12)',
};

const sectionTitle = {
  fontFamily: 'var(--font-heading)',
  fontSize: 'var(--text-2xl)',
  fontWeight: 'var(--font-bold)',
  color: 'var(--color-text-primary)',
  marginBottom: 'var(--space-6)',
  paddingBottom: 'var(--space-3)',
  borderBottom: '2px solid var(--color-border-secondary)',
};

const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--space-3)',
  alignItems: 'center',
  marginBottom: 'var(--space-4)',
};

const labelStyle = {
  fontSize: 'var(--text-sm)',
  color: 'var(--color-text-tertiary)',
  marginBottom: 'var(--space-2)',
  fontWeight: 'var(--font-medium)',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: 'var(--space-4)',
  marginBottom: 'var(--space-4)',
};

export default function ComponentsPage() {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  const [progressStep, setProgressStep] = useState(3);

  return (
    <Container>
      <div style={{ padding: 'var(--space-8) 0' }}>
        <h1 style={{ marginBottom: 'var(--space-2)' }}>Component Library</h1>
        <p style={{ marginBottom: 'var(--space-10)' }}>
          Development reference for all UI components. This page is for development only.
        </p>

        {/* ============ BUTTONS ============ */}
        <section style={sectionStyle}>
          <h2 style={sectionTitle}>Button</h2>

          <p style={labelStyle}>Variants</p>
          <div style={rowStyle}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>

          <p style={labelStyle}>Sizes</p>
          <div style={rowStyle}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>

          <p style={labelStyle}>States</p>
          <div style={rowStyle}>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
            <Button variant="secondary" disabled>Secondary Disabled</Button>
            <Button variant="danger" loading>Danger Loading</Button>
          </div>

          <p style={labelStyle}>Full Width</p>
          <div style={{ maxWidth: '400px' }}>
            <Button fullWidth>Full Width Button</Button>
          </div>
        </section>

        {/* ============ CARDS ============ */}
        <section style={sectionStyle}>
          <h2 style={sectionTitle}>Card</h2>

          <div style={gridStyle}>
            <Card variant="elevated">
              <h4>Elevated Card</h4>
              <p style={{ marginTop: 'var(--space-2)' }}>
                Default card with subtle shadow and border.
              </p>
            </Card>

            <Card variant="outlined">
              <h4>Outlined Card</h4>
              <p style={{ marginTop: 'var(--space-2)' }}>
                Transparent background with a visible border.
              </p>
            </Card>

            <Card variant="flat">
              <h4>Flat Card</h4>
              <p style={{ marginTop: 'var(--space-2)' }}>
                Gray background, no border or shadow.
              </p>
            </Card>
          </div>

          <p style={labelStyle}>Hoverable Card</p>
          <div style={gridStyle}>
            <Card variant="elevated" hoverable>
              <h4>Hover Me</h4>
              <p style={{ marginTop: 'var(--space-2)' }}>
                This card lifts and gains a stronger shadow on hover.
              </p>
            </Card>

            <Card variant="outlined" hoverable>
              <h4>Hover Me Too</h4>
              <p style={{ marginTop: 'var(--space-2)' }}>
                Outlined variant with hover lift.
              </p>
            </Card>
          </div>

          <p style={labelStyle}>Padding Sizes</p>
          <div style={gridStyle}>
            <Card padding="none" variant="outlined">
              <div style={{ padding: 'var(--space-3)', background: 'var(--color-gray-50)' }}>
                padding=&quot;none&quot;
              </div>
            </Card>
            <Card padding="sm" variant="outlined">padding=&quot;sm&quot;</Card>
            <Card padding="md" variant="outlined">padding=&quot;md&quot; (default)</Card>
            <Card padding="lg" variant="outlined">padding=&quot;lg&quot;</Card>
          </div>
        </section>

        {/* ============ PROGRESS BAR ============ */}
        <section style={sectionStyle}>
          <h2 style={sectionTitle}>ProgressBar</h2>

          <Card variant="flat" padding="lg">
            <p style={labelStyle}>Step {progressStep} of 5 — Click completed steps to navigate</p>
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <ProgressBar
                currentStep={progressStep}
                totalSteps={5}
                labels={['Info', 'Finance', 'Family', 'Health', 'Review']}
                onStepClick={(step) => setProgressStep(step)}
              />
            </div>
            <div style={rowStyle}>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setProgressStep((s) => Math.max(1, s - 1))}
                disabled={progressStep <= 1}
              >
                ← Previous
              </Button>
              <Button
                size="sm"
                onClick={() => setProgressStep((s) => Math.min(5, s + 1))}
                disabled={progressStep >= 5}
              >
                Next →
              </Button>
            </div>
          </Card>
        </section>

        {/* ============ INPUT ============ */}
        <section style={sectionStyle}>
          <h2 style={sectionTitle}>Input</h2>

          <div style={gridStyle}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              helperText="As it appears on your NRIC"
            />

            <Input
              label="Monthly Income"
              type="number"
              placeholder="0"
              prefix="S$"
              suffix="/month"
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              error="Please enter a valid email address"
              required
            />

            <Input
              label="Disabled Input"
              placeholder="Cannot edit this"
              disabled
              value="Pre-filled value"
            />
          </div>
        </section>

        {/* ============ SELECT ============ */}
        <section style={sectionStyle}>
          <h2 style={sectionTitle}>Select</h2>

          <div style={gridStyle}>
            <Select
              label="Residency Status"
              options={[
                { value: 'citizen', label: 'Singapore Citizen' },
                { value: 'pr', label: 'Permanent Resident' },
                { value: 'foreigner', label: 'Foreigner' },
              ]}
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              placeholder="Select your status..."
              required
            />

            <Select
              label="Industry"
              options={[
                { value: 'tech', label: 'Technology' },
                { value: 'finance', label: 'Finance & Banking' },
                { value: 'healthcare', label: 'Healthcare' },
                { value: 'education', label: 'Education' },
              ]}
              error="Please select an industry"
            />

            <Select
              label="Disabled Select"
              options={[]}
              disabled
              placeholder="Not available"
            />
          </div>
        </section>

        {/* ============ RADIO GROUP ============ */}
        <section style={sectionStyle}>
          <h2 style={sectionTitle}>RadioGroup</h2>

          <div style={gridStyle}>
            <Card variant="flat" padding="md">
              <RadioGroup
                label="Marital Status"
                name="marital"
                options={[
                  { value: 'single', label: 'Single' },
                  { value: 'married', label: 'Married' },
                  { value: 'divorced', label: 'Divorced' },
                  { value: 'widowed', label: 'Widowed' },
                ]}
                value={radioValue}
                onChange={setRadioValue}
                direction="vertical"
              />
            </Card>

            <Card variant="flat" padding="md">
              <RadioGroup
                label="Risk Tolerance"
                name="risk"
                options={[
                  {
                    value: 'conservative',
                    label: 'Conservative',
                    description: 'Higher coverage, higher premiums',
                  },
                  {
                    value: 'moderate',
                    label: 'Moderate',
                    description: 'Balanced coverage and cost',
                  },
                  {
                    value: 'aggressive',
                    label: 'Aggressive',
                    description: 'Lean coverage, lower premiums',
                  },
                ]}
                value=""
                onChange={() => {}}
                direction="vertical"
              />
            </Card>
          </div>

          <p style={labelStyle}>Horizontal Layout</p>
          <Card variant="flat" padding="md">
            <RadioGroup
              label="Gender"
              name="gender"
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
              value=""
              onChange={() => {}}
              direction="horizontal"
            />
          </Card>
        </section>

        {/* ============ SLIDER ============ */}
        <section style={sectionStyle}>
          <h2 style={sectionTitle}>Slider</h2>

          <div style={{ ...gridStyle, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            <Card variant="flat" padding="md">
              <Slider
                label="Retirement Age"
                min={55}
                max={70}
                step={1}
                value={sliderValue > 70 ? 65 : sliderValue > 55 ? sliderValue : 65}
                onChange={setSliderValue}
                minLabel="55 years"
                maxLabel="70 years"
                valueFormatter={(v) => `${v} years`}
              />
            </Card>

            <Card variant="flat" padding="md">
              <Slider
                label="Coverage Amount"
                min={0}
                max={1000000}
                step={10000}
                value={500000}
                onChange={() => {}}
                minLabel="S$0"
                maxLabel="S$1M"
                valueFormatter={(v) => `S$${(v / 1000).toFixed(0)}K`}
              />
            </Card>
          </div>
        </section>

        {/* ============ TOOLTIP ============ */}
        <section style={sectionStyle}>
          <h2 style={sectionTitle}>Tooltip</h2>

          <div style={{ ...rowStyle, gap: 'var(--space-10)', padding: 'var(--space-8) var(--space-4)' }}>
            <Tooltip content="This tooltip appears on top" position="top">
              <Button variant="secondary" size="sm">Top</Button>
            </Tooltip>

            <Tooltip content="This tooltip appears on the bottom" position="bottom">
              <Button variant="secondary" size="sm">Bottom</Button>
            </Tooltip>

            <Tooltip content="Left side tooltip" position="left">
              <Button variant="secondary" size="sm">Left</Button>
            </Tooltip>

            <Tooltip content="Right side tooltip" position="right">
              <Button variant="secondary" size="sm">Right</Button>
            </Tooltip>
          </div>

          <p style={labelStyle}>With Longer Content</p>
          <div style={{ padding: 'var(--space-4)' }}>
            <Tooltip
              content="CPF (Central Provident Fund) is Singapore's mandatory social security savings scheme. Contributions are split across Ordinary, Special, and MediSave accounts."
              position="top"
              maxWidth="320px"
            >
              <span style={{ color: 'var(--color-primary-600)', cursor: 'help', borderBottom: '1px dashed var(--color-primary-300)' }}>
                What is CPF? ℹ️
              </span>
            </Tooltip>
          </div>
        </section>

        {/* ============ CONTAINER ============ */}
        <section style={sectionStyle}>
          <h2 style={sectionTitle}>Container Sizes</h2>

          {['sm', 'md', 'lg', 'full'].map((size) => (
            <div key={size} style={{ marginBottom: 'var(--space-3)' }}>
              <Container size={size}>
                <Card variant="flat" padding="sm">
                  <code style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary-600)' }}>
                    Container size=&quot;{size}&quot;
                  </code>
                </Card>
              </Container>
            </div>
          ))}
        </section>
      </div>
    </Container>
  );
}
