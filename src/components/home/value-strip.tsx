const valueItems = [
  {
    strong: "Hays Visibility Sprint",
    text: "A focused setup to get found, trusted, contacted, tracked, and followed up with.",
  },
  {
    strong: "Local SEO",
    text: "Hays and Northwest Kansas pages, technical cleanup, and Google visibility basics.",
  },
  {
    strong: "Google Ads",
    text: "Search campaigns tied to calls, forms, and service-specific landing pages.",
  },
  {
    strong: "AI follow-up",
    text: "Missed-call text-back, speed-to-lead, and CRM reminders that reduce lost leads.",
  },
  {
    strong: "CRM systems",
    text: "Cleaner pipelines, quoting, and customer records.",
  },
  {
    strong: "Client portals",
    text: "A better way for customers and teams to stay aligned.",
  },
  {
    strong: "Conversion strategy",
    text: "Sharper pages, offers, and forms for higher intent.",
  },
  {
    strong: "Dashboards",
    text: "Marketing and operations reporting you can actually use.",
  },
];

export function ValueStrip() {
  return (
    <section className="ps-value-strip" aria-label="Preisser Solutions services">
      <div className="ps-value-strip-track">
        {valueItems.map((item) => (
          <div key={item.strong} className="ps-value-item">
            <p className="ps-value-text">
              <strong>{item.strong}</strong>
              <span>{item.text}</span>
            </p>
          </div>
        ))}
        {valueItems.map((item) => (
          <div key={`${item.strong}-duplicate`} className="ps-value-item" aria-hidden="true">
            <p className="ps-value-text">
              <strong>{item.strong}</strong>
              <span>{item.text}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
