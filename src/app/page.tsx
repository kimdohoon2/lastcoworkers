export default function Home() {
  return (
    <div className="space-y-4 p-4">
      {/* Brand Colors */}
      <div className="bg-brand-primary p-4 text-white">Brand Primary</div>
      <div className="bg-brand-secondary p-4 text-white">Brand Secondary</div>
      <div className="bg-brand-tertiary p-4 text-white">Brand Tertiary</div>
      <div className="from-brand-primary to-brand-tertiary bg-gradient-to-r p-4 text-white">
        Brand Gradient
      </div>

      {/* Point Colors */}
      <div className="bg-point-purple p-4 text-4xl font-semibold text-white">
        Point Purple
      </div>
      <div className="bg-point-blue p-4 text-white">Point Blue</div>
      <div className="bg-point-cyan p-4 text-white">Point Cyan</div>
      <div className="bg-point-pink p-4 text-white">Point Pink</div>
      <div className="bg-point-rose p-4 text-white">Point Rose</div>
      <div className="bg-point-orange p-4 text-white">Point Orange</div>
      <div className="bg-point-yellow p-4 text-white">Point Yellow</div>
      <div className="bg-point-red p-4 text-white">Point Red</div>

      {/* Background Colors */}
      <div className="bg-background-primary p-4 text-white">
        Background Primary
      </div>
      <div className="bg-background-secondary p-4 text-white">
        Background Secondary
      </div>
      <div className="bg-background-tertiary p-4 text-white">
        Background Tertiary
      </div>
      <div className="bg-background-inverse p-4 text-black">
        Background Inverse
      </div>

      {/* Interaction Colors */}
      <div className="bg-interaction-inactive p-4 text-white">
        Interaction Inactive
      </div>
      <div className="bg-interaction-hover p-4 text-white">
        Interaction Hover
      </div>
      <div className="bg-interaction-pressed p-4 text-white">
        Interaction Pressed
      </div>
      <div className="bg-interaction-focus p-4 text-white">
        Interaction Focus
      </div>

      {/* Border Colors */}
      <div className="border-border-primary border-4 p-4">Border Primary</div>

      {/* Text Colors */}
      <div className="text-text-primary p-4">Text Primary</div>
      <div className="text-text-secondary p-4">Text Secondary</div>
      <div className="text-text-tertiary p-4">Text Tertiary</div>
      <div className="text-text-danger p-4">Text Danger</div>
      <div className="text-text-default p-4">Text Default</div>
      <div className="text-text-inverse p-4">Text Inverse</div>
      <div className="text-text-disabled p-4">Text Disabled</div>

      {/* Status Colors */}
      <div className="bg-status-danger p-4 text-white">Status Danger</div>

      {/* Icon Colors */}
      <div className="text-icon-primary p-4">Icon Primary</div>
      <div className="text-icon-inverse p-4">Icon Inverse</div>
      <div className="text-icon-brand p-4">Icon Brand</div>
      <div className="text-icon-danger inter p-4">Icon Danger</div>
    </div>
  );
}
