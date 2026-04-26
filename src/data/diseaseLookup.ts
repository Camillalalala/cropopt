export type DiseaseLookupEntry = {
  label: string;
  mitigationSteps: string;
};

export const diseaseLookup: Record<string, DiseaseLookupEntry> = {
  leaf_rust: {
    label: 'Leaf Rust',
    mitigationSteps:
      'Remove heavily infected leaves, improve airflow between plants, avoid overhead watering late in the day, and apply a rust-labeled fungicide if spread continues.',
  },
  blight: {
    label: 'Blight',
    mitigationSteps:
      'Prune infected tissue immediately, sanitize tools between cuts, reduce leaf wetness duration, and apply a preventative copper-based treatment as directed.',
  },
  healthy: {
    label: 'Healthy Leaf',
    mitigationSteps:
      'No treatment needed. Continue regular monitoring, balanced watering, and weekly visual checks for early disease signs.',
  },

  // ── PlantVillage 38-class entries ──────────────────────────────────

  // Apple
  apple_scab: {
    label: 'Apple Scab',
    mitigationSteps:
      'Remove and destroy fallen leaves and infected fruit to reduce overwintering spores. Apply a captan or myclobutanil fungicide at green-tip through petal-fall stages. Prune canopy to improve air circulation and reduce leaf wetness duration.',
  },
  apple_black_rot: {
    label: 'Apple Black Rot',
    mitigationSteps:
      'Prune out cankers and mummified fruit, disposing of them away from the orchard. Apply a fungicide such as captan or thiophanate-methyl from bloom through early fruit development. Maintain good sanitation by removing deadwood and debris from the orchard floor.',
  },
  apple_cedar_rust: {
    label: 'Apple Cedar Rust',
    mitigationSteps:
      'Remove nearby juniper or cedar hosts within a few hundred meters if possible. Apply a myclobutanil or mancozeb fungicide starting at pink bud stage through petal fall. Choose resistant apple cultivars for future plantings.',
  },
  apple_healthy: {
    label: 'Apple (Healthy)',
    mitigationSteps:
      'No treatment needed. Continue regular monitoring, balanced watering, and weekly visual checks for early disease signs.',
  },

  // Blueberry
  blueberry_healthy: {
    label: 'Blueberry (Healthy)',
    mitigationSteps:
      'No treatment needed. Continue regular monitoring, balanced watering, and weekly visual checks for early disease signs.',
  },

  // Cherry
  cherry_powdery_mildew: {
    label: 'Cherry Powdery Mildew',
    mitigationSteps:
      'Remove and destroy heavily infected shoots and leaves. Apply sulfur-based or potassium bicarbonate fungicides at the first sign of white powdery growth. Ensure adequate spacing and pruning to maximize airflow through the canopy.',
  },
  cherry_healthy: {
    label: 'Cherry (Healthy)',
    mitigationSteps:
      'No treatment needed. Continue regular monitoring, balanced watering, and weekly visual checks for early disease signs.',
  },

  // Corn
  corn_cercospora: {
    label: 'Corn Gray Leaf Spot (Cercospora)',
    mitigationSteps:
      'Rotate away from corn for at least one season to break the disease cycle. Apply a strobilurin or triazole fungicide at the VT/R1 growth stage if disease pressure is high. Use resistant hybrids and till under crop residue after harvest to reduce inoculum.',
  },
  corn_common_rust: {
    label: 'Corn Common Rust',
    mitigationSteps:
      'Plant rust-resistant hybrids whenever available. Apply a foliar fungicide such as azoxystrobin or propiconazole if pustules appear before tasseling. Scout fields regularly, especially during cool and humid weather, to catch infections early.',
  },
  corn_northern_blight: {
    label: 'Corn Northern Leaf Blight',
    mitigationSteps:
      'Choose resistant hybrids and practice crop rotation away from corn. Apply a triazole or strobilurin fungicide at VT/R1 if lower-leaf lesions are moving upward. Incorporate crop residue through tillage to reduce overwintering spores.',
  },
  corn_healthy: {
    label: 'Corn (Healthy)',
    mitigationSteps:
      'No treatment needed. Continue regular monitoring, balanced watering, and weekly visual checks for early disease signs.',
  },

  // Grape
  grape_black_rot: {
    label: 'Grape Black Rot',
    mitigationSteps:
      'Remove mummified berries and infected canes during dormant pruning. Apply a myclobutanil or mancozeb fungicide from early shoot growth through four weeks after bloom. Maintain an open canopy to promote rapid drying of foliage and fruit.',
  },
  grape_esca: {
    label: 'Grape Esca (Black Measles)',
    mitigationSteps:
      'Prune out dead and cankered wood well below visible symptoms, sterilizing tools between cuts. Protect pruning wounds with a wound sealant or fungicide paste to prevent reinfection. Avoid severe water stress, which can trigger symptom expression in infected vines.',
  },
  grape_leaf_blight: {
    label: 'Grape Leaf Blight (Isariopsis)',
    mitigationSteps:
      'Remove and destroy infected leaves as soon as symptoms appear. Apply a mancozeb or copper-based fungicide on a preventative schedule during wet conditions. Improve canopy airflow through proper trellising and shoot positioning.',
  },
  grape_healthy: {
    label: 'Grape (Healthy)',
    mitigationSteps:
      'No treatment needed. Continue regular monitoring, balanced watering, and weekly visual checks for early disease signs.',
  },

  // Orange
  orange_huanglongbing: {
    label: 'Orange Huanglongbing (Citrus Greening)',
    mitigationSteps:
      'Control Asian citrus psyllid populations with systemic insecticides such as imidacloprid or foliar sprays of spinosad. Remove and destroy confirmed infected trees promptly to prevent spread to neighboring citrus. Use certified disease-free nursery stock for all new plantings.',
  },

  // Peach
  peach_bacterial_spot: {
    label: 'Peach Bacterial Spot',
    mitigationSteps:
      'Apply copper-based bactericides during dormancy and at early bloom to reduce bacterial populations. Avoid overhead irrigation that prolongs leaf wetness. Select resistant cultivars for future plantings and remove severely infected shoots during pruning.',
  },
  peach_healthy: {
    label: 'Peach (Healthy)',
    mitigationSteps:
      'No treatment needed. Continue regular monitoring, balanced watering, and weekly visual checks for early disease signs.',
  },

  // Pepper
  pepper_bacterial_spot: {
    label: 'Pepper Bacterial Spot',
    mitigationSteps:
      'Remove and destroy infected plant material immediately. Apply copper hydroxide plus mancozeb sprays on a 7-10 day schedule during wet weather. Use pathogen-free seed and rotate away from peppers and tomatoes for at least two years.',
  },
  pepper_healthy: {
    label: 'Pepper (Healthy)',
    mitigationSteps:
      'No treatment needed. Continue regular monitoring, balanced watering, and weekly visual checks for early disease signs.',
  },

  // Potato
  potato_early_blight: {
    label: 'Potato Early Blight',
    mitigationSteps:
      'Remove lower infected leaves to slow the upward spread of the fungus. Apply chlorothalonil or mancozeb fungicide on a 7-10 day interval when conditions favor disease. Practice crop rotation and avoid overhead irrigation to reduce leaf wetness.',
  },
  potato_late_blight: {
    label: 'Potato Late Blight',
    mitigationSteps:
      'Act quickly by removing and destroying all infected foliage and tubers. Apply a systemic fungicide such as mefenoxam or cymoxanil combined with a protectant like chlorothalonil. Avoid planting near cull piles and use certified disease-free seed potatoes.',
  },
  potato_healthy: {
    label: 'Potato (Healthy)',
    mitigationSteps:
      'No treatment needed. Continue regular monitoring, balanced watering, and weekly visual checks for early disease signs.',
  },

  // Raspberry
  raspberry_healthy: {
    label: 'Raspberry (Healthy)',
    mitigationSteps:
      'No treatment needed. Continue regular monitoring, balanced watering, and weekly visual checks for early disease signs.',
  },

  // Soybean
  soybean_healthy: {
    label: 'Soybean (Healthy)',
    mitigationSteps:
      'No treatment needed. Continue regular monitoring, balanced watering, and weekly visual checks for early disease signs.',
  },

  // Squash
  squash_powdery_mildew: {
    label: 'Squash Powdery Mildew',
    mitigationSteps:
      'Remove heavily infected leaves and dispose of them away from the field. Apply sulfur, potassium bicarbonate, or neem oil at the first sign of white powdery patches. Space plants generously and avoid excess nitrogen fertilization, which promotes succulent growth.',
  },

  // Strawberry
  strawberry_leaf_scorch: {
    label: 'Strawberry Leaf Scorch',
    mitigationSteps:
      'Remove and destroy severely scorched leaves to reduce pathogen carryover. Apply a captan or myclobutanil fungicide during bloom and fruit development. Renovate beds after harvest by mowing, thinning, and improving drainage.',
  },
  strawberry_healthy: {
    label: 'Strawberry (Healthy)',
    mitigationSteps:
      'No treatment needed. Continue regular monitoring, balanced watering, and weekly visual checks for early disease signs.',
  },

  // Tomato
  tomato_bacterial_spot: {
    label: 'Tomato Bacterial Spot',
    mitigationSteps:
      'Remove infected leaves and fruit and dispose of them away from the field. Apply copper-based sprays combined with mancozeb on a 5-7 day schedule during wet conditions. Use disease-free transplants and rotate away from tomatoes and peppers for two or more years.',
  },
  tomato_early_blight: {
    label: 'Tomato Early Blight',
    mitigationSteps:
      'Prune lower leaves that show concentric ring lesions and mulch around the base to prevent soil splash. Apply chlorothalonil or copper fungicide every 7-10 days during warm, humid weather. Rotate with non-solanaceous crops and stake plants for better airflow.',
  },
  tomato_late_blight: {
    label: 'Tomato Late Blight',
    mitigationSteps:
      'Remove and destroy all infected plants immediately to prevent rapid spread. Apply a fungicide containing chlorothalonil, mancozeb, or cymoxanil as soon as conditions are wet and cool. Avoid overhead watering and source certified disease-free transplants.',
  },
  tomato_leaf_mold: {
    label: 'Tomato Leaf Mold',
    mitigationSteps:
      'Improve greenhouse or high-tunnel ventilation to lower humidity below 85%. Remove and destroy infected leaves and apply a chlorothalonil or copper-based fungicide. Use resistant tomato varieties and avoid wetting foliage during irrigation.',
  },
  tomato_septoria: {
    label: 'Tomato Septoria Leaf Spot',
    mitigationSteps:
      'Remove lower infected leaves promptly and dispose of them away from the garden. Apply chlorothalonil or copper fungicide on a 7-10 day schedule beginning at first symptom. Mulch around plants to prevent rain-splashed soil from reaching foliage.',
  },
  tomato_spider_mites: {
    label: 'Tomato Spider Mites',
    mitigationSteps:
      'Spray the undersides of leaves with a strong water jet to dislodge mites. Apply insecticidal soap or neem oil every 5-7 days until populations decline. Encourage natural predators such as ladybugs and predatory mites and avoid broad-spectrum insecticides.',
  },
  tomato_target_spot: {
    label: 'Tomato Target Spot',
    mitigationSteps:
      'Remove and destroy infected leaves showing concentric brown lesions. Apply a chlorothalonil or azoxystrobin fungicide on a preventative 7-10 day schedule. Stake or cage plants for better airflow and avoid overhead irrigation.',
  },
  tomato_yellow_curl: {
    label: 'Tomato Yellow Leaf Curl Virus',
    mitigationSteps:
      'Control whitefly vectors with reflective mulch, yellow sticky traps, and insecticides such as imidacloprid or pyriproxyfen. Remove and destroy infected plants promptly since there is no cure for the virus. Plant resistant tomato varieties and use floating row covers to exclude whiteflies.',
  },
  tomato_mosaic: {
    label: 'Tomato Mosaic Virus',
    mitigationSteps:
      'Remove and destroy infected plants immediately; the virus spreads easily through sap contact. Disinfect all tools, stakes, and hands with a 10% bleach or milk solution between plants. Use certified virus-free seed and resistant varieties for future plantings.',
  },
  tomato_healthy: {
    label: 'Tomato (Healthy)',
    mitigationSteps:
      'No treatment needed. Continue regular monitoring, balanced watering, and weekly visual checks for early disease signs.',
  },
};

export function getDiseaseInfo(diseaseId: string): DiseaseLookupEntry {
  return (
    diseaseLookup[diseaseId] ?? {
      label: 'Unknown Disease',
      mitigationSteps:
        'Capture another scan in better lighting and send this sample to the agronomy team for manual review.',
    }
  );
}
