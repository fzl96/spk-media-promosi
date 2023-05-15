import { Alternative, Evaluation, NormalizedMatrixSAW, PreferenceMatrixSAW } from "@/types";

function getCriteriaWeights(data: Alternative[]) {
  const criteriaWeights = data[0].evaluation.map((criteria) => {
    return {
      criteriaId: criteria.criteriaId,
      criteriaCode: criteria.criteriaCode,
      criteriaName: criteria.criteriaName,
      criteriaType: criteria.criteriaType,
      criteriaWeight: criteria.criteriaWeight,
    };
  }
  );
  // restructure the criteriaWeights to be an object with criteriaCode as the key and the value is the criteriaWeight
  const criteriaWeightsObject = criteriaWeights.reduce((acc, cur) => {
    acc[cur.criteriaCode] = cur.criteriaWeight;
    return acc;
  }
  , {} as Record<string, number>);
  return criteriaWeightsObject;
}

function calculateNormalizationFactors(data: Alternative[]) {
  // get the highest value for each criteria if the criteria type is benefit and the lowest value if the criteria type is cost, the result should be an object with criteriaCode as the key and the value is the highest/lowest value
  const normalizationFactors = data.reduce((acc, cur) => {
    cur.evaluation.forEach((criteria) => {
      if (criteria.criteriaType.toLocaleLowerCase() === "benefit") {
        if (acc[criteria.criteriaCode]) {
          if (acc[criteria.criteriaCode] < criteria.nilai) {
            acc[criteria.criteriaCode] = criteria.nilai;
          }
        } else {
          acc[criteria.criteriaCode] = criteria.nilai;
        }
      } else {
        if (acc[criteria.criteriaCode]) {
          if (acc[criteria.criteriaCode] > criteria.nilai) {
            acc[criteria.criteriaCode] = criteria.nilai;
          }
        } else {
          acc[criteria.criteriaCode] = criteria.nilai;
        }
      }
    });
    return acc;
  } , {} as Record<string, number>);
  return normalizationFactors;
}

const getNormalizedMatrix = (data: Alternative[], normalizationFactors: Record<string, number>): Alternative[] => {
  const normalizedMatrix = data.map((alternative) => {
    const evaluation = alternative.evaluation.map((criteria) => {
      return {
        criteriaId: criteria.criteriaId,
        criteriaCode: criteria.criteriaCode,
        criteriaName: criteria.criteriaName,
        criteriaType: criteria.criteriaType,
        criteriaWeight: criteria.criteriaWeight,
        nilai: criteria.nilai / normalizationFactors[criteria.criteriaCode],
      };
    }
    );
    return {
      id: alternative.id,
      name: alternative.name,
      evaluation,
    };
  }
  );
  return normalizedMatrix;
};

function getPreferenceMatrix(normalziedMatrix: Alternative[], criteriaWeights: Record<string, number>) {
// get the preference matrix by multiplying the normalized value with the criteria weight for each criteria 
  const preferenceMatrix = normalziedMatrix.map((alternative) => {
    const preferenceValues = alternative.evaluation.map((criteria) => {
      return {
        criteriaId: criteria.criteriaId,
        criteriaCode: criteria.criteriaCode,
        criteriaName: criteria.criteriaName,
        criteriaType: criteria.criteriaType,
        criteriaWeight: criteria.criteriaWeight,
        preferenceValue: criteria.nilai * criteriaWeights[criteria.criteriaCode],
      };
    }
    );
    return {
      id: alternative.id,
      name: alternative.name,
      preferenceValues,
    };
  }
  );
  return preferenceMatrix;
}

// create a function to get the sum of the preference value for each alternative
function getSumPreferenceValue(preferenceMatrix: PreferenceMatrixSAW[]) {
  const sumPreferenceValue = preferenceMatrix.map((alternative) => {
    const sum = alternative.preferenceValues.reduce((acc, cur) => {
      return acc + cur.preferenceValue;
    }
    , 0);
    return {
      id: alternative.id,
      name: alternative.name,
      sumPreferenceValue: sum,
    };
  }
  );
  return sumPreferenceValue;
}

function getRank(sumPreferenceValue: { id: string; name: string; sumPreferenceValue: number; }[]) {
  const sortedSumPreferenceValue = sumPreferenceValue.sort((a, b) => b.sumPreferenceValue - a.sumPreferenceValue);
  const rank = sortedSumPreferenceValue.map((alternative, index) => {
    return {
      id: alternative.id,
      name: alternative.name,
      value: alternative.sumPreferenceValue,
      rank: index + 1,
    };
  }
  );
  return rank;
}

export function getSAW(data: Alternative[]){

  if (data.length === 0) {
    return null
  }

  const criteriaWeights = getCriteriaWeights(data);
  const normalizationFactors = calculateNormalizationFactors(data);
  const normalizedMatrix = getNormalizedMatrix(data, normalizationFactors);
  const preferenceMatrix = getPreferenceMatrix(normalizedMatrix, criteriaWeights);
  const sumPreferenceValue = getSumPreferenceValue(preferenceMatrix);
  const rankedAlternative = getRank(sumPreferenceValue);

  return {
    criteriaWeights,
    normalizationFactors,
    normalizedMatrix,
    preferenceMatrix,
    sumPreferenceValue,
    rankedAlternative,
  };
}