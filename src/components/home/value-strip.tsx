const valueItems = [
  {
    strong: "Websites that convert",
    text: "Modern sites built to earn trust and bring in leads.",
  },
  {
    strong: "Local SEO",
    text: "Kansas search visibility across Google and AI answers.",
  },
  {
    strong: "Paid ads",
    text: "Accountable campaigns for real service inquiries.",
  },
  {
    strong: "AI follow-up",
    text: "Practical automation that keeps prospects moving.",
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
