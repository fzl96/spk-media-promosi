interface Evaluation {
  criteriaId: string;
  criteriaName: string;
  criteriaWeight: number;
  criteriaCode: string;
  criteriaType: "benefit" | "cost";
  nilai: number;
}

interface Alternative {
  id: string;
  name: string;
  evaluation: Evaluation[];
}

export const alternatif: Alternative[] = [
  {
    id: "1",
    name: "A1",
    evaluation: [
      {
        criteriaId: "1",
        criteriaName: "C1",
        criteriaWeight: 0.2,
        criteriaCode: "C1",
        criteriaType: "cost",
        nilai: 420,
      },
      {
        criteriaId: "2",
        criteriaName: "C2",
        criteriaWeight: 0.15,
        criteriaCode: "C2",
        criteriaType: "benefit",
        nilai: 75,
      },
      {
        criteriaId: "3",
        criteriaName: "C3",
        criteriaWeight: 0.3,
        criteriaCode: "C3",
        criteriaType: "benefit",
        nilai: 3,
      },
      {
        criteriaId: "4",
        criteriaName: "C4",
        criteriaWeight: 0.25,
        criteriaCode: "C4",
        criteriaType: "cost",
        nilai: 1,
      },
      {
        criteriaId: "5",
        criteriaName: "C5",
        criteriaWeight: 0.1,
        criteriaCode: "C5",
        criteriaType: "benefit",
        nilai: 3,
      },
    ],
  },
  {
    id: "2",
    name: "A2",
    evaluation: [
      {
        criteriaId: "1",
        criteriaName: "C1",
        criteriaWeight: 0.2,
        criteriaCode: "C1",
        criteriaType: "cost",
        nilai: 580,
      },
      {
        criteriaId: "2",
        criteriaName: "C2",
        criteriaWeight: 0.15,
        criteriaType: "benefit",
        criteriaCode: "C2",
        nilai: 220,
      },
      {
        criteriaId: "3",
        criteriaName: "C3",
        criteriaWeight: 0.3,
        criteriaCode: "C3",
        criteriaType: "benefit",
        nilai: 2,
      },
      {
        criteriaId: "4",
        criteriaName: "C4",
        criteriaWeight: 0.25,
        criteriaCode: "C4",
        criteriaType: "cost",
        nilai: 3,
      },
      {
        criteriaId: "5",
        criteriaName: "C5",
        criteriaWeight: 0.1,
        criteriaCode: "C5",
        criteriaType: "benefit",
        nilai: 2,
      },
    ],
  },
  {
    id: "3",
    name: "A3",
    evaluation: [
      {
        criteriaId: "1",
        criteriaName: "C1",
        criteriaWeight: 0.2,
        criteriaCode: "C1",
        criteriaType: "cost",
        nilai: 350,
      },
      {
        criteriaId: "2",
        criteriaName: "C2",
        criteriaWeight: 0.15,
        criteriaCode: "C2",
        criteriaType: "benefit",
        nilai: 80,
      },
      {
        criteriaId: "3",
        criteriaName: "C3",
        criteriaWeight: 0.3,
        criteriaCode: "C3",
        criteriaType: "benefit",
        nilai: 4,
      },
      {
        criteriaId: "4",
        criteriaName: "C4",
        criteriaWeight: 0.25,
        criteriaCode: "C4",
        criteriaType: "cost",
        nilai: 2,
      },
      {
        criteriaId: "5",
        criteriaName: "C5",
        criteriaWeight: 0.1,
        criteriaCode: "C5",
        criteriaType: "benefit",
        nilai: 1,
      },
    ],
  },
  {
    id: "4",
    name: "A4",
    evaluation: [
      {
        criteriaId: "1",
        criteriaName: "C1",
        criteriaWeight: 0.2,
        criteriaCode: "C1",
        criteriaType: "cost",
        nilai: 410,
      },
      {
        criteriaId: "2",
        criteriaName: "C2",
        criteriaWeight: 0.15,
        criteriaCode: "C2",
        criteriaType: "benefit",
        nilai: 170,
      },
      {
        criteriaId: "3",
        criteriaName: "C3",
        criteriaWeight: 0.3,
        criteriaCode: "C3",
        criteriaType: "benefit",
        nilai: 3,
      },
      {
        criteriaId: "4",
        criteriaName: "C4",
        criteriaWeight: 0.25,
        criteriaCode: "C4",
        criteriaType: "cost",
        nilai: 4,
      },
      {
        criteriaId: "5",
        criteriaName: "C5",
        criteriaWeight: 0.1,
        criteriaCode: "C5",
        criteriaType: "benefit",
        nilai: 2,
      },
    ],
  },
];
