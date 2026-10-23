export const services = [
  {
    id: "turnkey",
    title: "Turnkey homes",
    summary:
      "From empty plot to finished house under one contract — design, approvals, structure and finishing.",
    points: [
      "Architectural and structural drawings",
      "Society and authority approvals",
      "Complete grey structure",
      "Finishing, fixtures and handover",
    ],
  },
  {
    id: "grey-structure",
    title: "Grey structure",
    summary:
      "Foundations, frame, brickwork and roof slabs — the part of the house that has to be right the first time.",
    points: [
      "Excavation and foundations",
      "Columns, beams and slabs",
      "Brickwork and plaster",
      "Plumbing and electrical conduits",
    ],
  },
  {
    id: "finishing",
    title: "Finishing works",
    summary:
      "Flooring, woodwork, kitchens and bathrooms, paint and lighting — the rooms you actually live in.",
    points: [
      "Tile, marble and wooden flooring",
      "Doors, wardrobes and kitchens",
      "Bathrooms and sanitary fittings",
      "Paint, lighting and electrical",
    ],
  },
  {
    id: "renovation",
    title: "Renovation & extensions",
    summary:
      "New floors, new rooms, or a complete refresh of an existing house — planned around the people living in it.",
    points: [
      "Structural assessment",
      "Additional storeys and rooms",
      "Kitchen and bathroom remodels",
      "Façade and exterior updates",
    ],
  },
  {
    id: "commercial",
    title: "Commercial construction",
    summary:
      "Offices, shops and mixed-use buildings delivered to programme, with the same care as a home.",
    points: [
      "Office and retail buildings",
      "Interior fit-outs",
      "Phased construction",
      "Services coordination",
    ],
  },
  {
    id: "design-approvals",
    title: "Design & approvals",
    summary:
      "Drawings, estimates and approvals before a single brick is laid, so the build starts with no surprises.",
    points: [
      "Architectural design",
      "Structural design",
      "Bill of quantities and estimate",
      "Approval submissions",
    ],
  },
] as const;

export const processSteps = [
  {
    title: "Site visit",
    copy: "We visit your plot or house, listen to what you need, and talk through budget and timing.",
  },
  {
    title: "Design & estimate",
    copy: "Drawings and a detailed bill of quantities, so the price is clear before anything is built.",
  },
  {
    title: "Approvals",
    copy: "We prepare and follow up the submissions needed to start work legally.",
  },
  {
    title: "Construction",
    copy: "Structure, then finishing, with regular progress updates and site inspections at every stage.",
  },
  {
    title: "Handover",
    copy: "A final walkthrough, a snag list closed out, and the keys to a finished house.",
  },
] as const;

export const faqs = [
  {
    question: "How is a project priced?",
    answer:
      "After a site visit we prepare drawings and a bill of quantities. You receive an itemised estimate — for grey structure only, or for the complete house — before any work begins.",
  },
  {
    question: "Can you build from my own architect’s drawings?",
    answer:
      "Yes. We build from your drawings, or our team can prepare architectural and structural designs for you.",
  },
  {
    question: "Do you handle approvals?",
    answer:
      "We prepare the drawings and paperwork needed for approval and follow the submission through, so construction can start without delay.",
  },
  {
    question: "How will I know how the work is going?",
    answer:
      "You get regular updates with photos from site, and you are welcome to visit at any stage of construction.",
  },
] as const;
