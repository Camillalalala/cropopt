export type DiseaseLookupEntry = {
  label: string;
  mitigationSteps: string;
};

export const diseaseLookup: Record<string, DiseaseLookupEntry> = {
  leaf_rust: {
    label: 'Leaf Rust',
    mitigationSteps:
      'Signs to look for: Orange or brown dusty spots on leaves. Leaves may turn yellow and fall off early.\n\nWhat to do:\n- Pick off leaves with many spots and throw them away\n- Give plants more space so air can move between them\n- Water at the base, not from above\n- If it keeps spreading, ask for a rust fungicide spray at your local agro shop',
  },
  blight: {
    label: 'Blight',
    mitigationSteps:
      'Signs to look for: Dark brown or black patches on leaves that spread fast. Leaves look burnt or water-soaked.\n\nWhat to do:\n- Cut off the sick parts right away with clean tools\n- Clean your cutting tools between each cut\n- Keep leaves dry - water at the roots only\n- Ask for copper spray at your agro shop and follow the instructions on the packet',
  },
  healthy: {
    label: 'Healthy Leaf',
    mitigationSteps:
      'Good news! Your plant looks healthy.\n\nWhat to do:\n- Keep watering regularly\n- Check your plants every week for any new spots or color changes\n- Keep your field clean of old leaves and weeds',
  },

  // ── PlantVillage 38-class entries ──────────────────────────────────

  // Apple
  apple_scab: {
    label: 'Apple Scab',
    mitigationSteps:
      'Signs to look for: Dark olive-green or brown velvety spots on leaves. Fruit gets rough, cracked, dark patches.\n\nWhat to do:\n- Rake up and burn fallen leaves - the disease lives in them\n- Remove and throw away fruit with dark patches\n- Prune branches so air flows through the tree\n- Ask for captan fungicide spray at your agro shop',
  },
  apple_black_rot: {
    label: 'Apple Black Rot',
    mitigationSteps:
      'Signs to look for: Brown spots with purple edges on leaves. Fruit turns black and rots, sometimes dries up on the tree.\n\nWhat to do:\n- Cut off dead branches and remove rotten fruit\n- Clean fallen fruit and leaves from under the tree\n- Ask for captan spray at your agro shop\n- Throw away all rotten material far from your trees',
  },
  apple_cedar_rust: {
    label: 'Apple Cedar Rust',
    mitigationSteps:
      'Signs to look for: Bright orange or yellow spots on top of leaves. Small tubes or bumps on the underside of leaves.\n\nWhat to do:\n- If you have juniper or cedar trees nearby, remove them if you can\n- Spray with fungicide when flower buds start to show color\n- Choose apple types that resist this disease for new plantings\n- Ask for mancozeb spray at your agro shop',
  },
  apple_healthy: {
    label: 'Apple (Healthy)',
    mitigationSteps:
      'Good news! Your apple tree looks healthy.\n\nWhat to do:\n- Keep checking leaves and fruit every week\n- Water regularly and keep the ground under the tree clean\n- Prune dead branches to keep air flowing',
  },

  // Blueberry
  blueberry_healthy: {
    label: 'Blueberry (Healthy)',
    mitigationSteps:
      'Good news! Your blueberry plant looks healthy.\n\nWhat to do:\n- Keep watering regularly\n- Check plants every week for any new spots\n- Keep soil acidic with mulch',
  },

  // Cherry
  cherry_powdery_mildew: {
    label: 'Cherry Powdery Mildew',
    mitigationSteps:
      'Signs to look for: White powdery coating on leaves, like flour was dusted on them. New leaves may curl or twist.\n\nWhat to do:\n- Remove leaves with heavy white coating\n- Give trees more space so air can dry the leaves\n- Ask for sulfur spray at your agro shop\n- Do not water from above - water at the base',
  },
  cherry_healthy: {
    label: 'Cherry (Healthy)',
    mitigationSteps:
      'Good news! Your cherry tree looks healthy.\n\nWhat to do:\n- Keep watering regularly\n- Check leaves every week for white powder or spots\n- Prune to keep good airflow',
  },

  // Corn
  corn_cercospora: {
    label: 'Corn Gray Leaf Spot',
    mitigationSteps:
      'Signs to look for: Long, narrow gray or tan rectangles on leaves. Spots follow the leaf veins and look like tiny bricks.\n\nWhat to do:\n- Do not plant corn in the same field next season - rotate with beans or another crop\n- Plow old corn stalks into the soil after harvest\n- Choose corn seed that resists this disease\n- If spots are spreading fast before tasseling, ask for fungicide at your agro shop',
  },
  corn_common_rust: {
    label: 'Corn Common Rust',
    mitigationSteps:
      'Signs to look for: Small raised red-brown bumps on both sides of leaves. Rub a leaf - if rusty powder comes off on your finger, it is rust.\n\nWhat to do:\n- Plant rust-resistant corn varieties next season\n- Check fields often during cool, damp weather\n- If bumps appear before the tassel comes out, ask for fungicide spray\n- Most corn recovers if rust comes late in the season',
  },
  corn_northern_blight: {
    label: 'Corn Northern Leaf Blight',
    mitigationSteps:
      'Signs to look for: Long cigar-shaped gray-green spots on leaves, 3-15 cm long. Starts on lower leaves and moves up.\n\nWhat to do:\n- Rotate crops - do not plant corn after corn\n- Plow old stalks under after harvest\n- Choose resistant corn varieties\n- If disease is moving up the plant before tasseling, ask for fungicide',
  },
  corn_healthy: {
    label: 'Corn (Healthy)',
    mitigationSteps:
      'Good news! Your corn looks healthy.\n\nWhat to do:\n- Keep watering regularly\n- Watch lower leaves for any spots as the season goes on\n- Rotate corn with other crops each year',
  },

  // Grape
  grape_black_rot: {
    label: 'Grape Black Rot',
    mitigationSteps:
      'Signs to look for: Small brown spots on leaves with dark edges. Grapes turn brown, then shrivel up into hard black mummies.\n\nWhat to do:\n- Remove all shriveled black grapes from the vine and ground\n- Prune vines to let air and sunlight in\n- Ask for fungicide spray at your agro shop - start early when shoots are growing\n- Clean up all fallen fruit and leaves',
  },
  grape_esca: {
    label: 'Grape Esca (Black Measles)',
    mitigationSteps:
      'Signs to look for: Tiger-stripe pattern on leaves - yellow and brown stripes between the veins. Dark spots on fruit. Sometimes whole branches die suddenly.\n\nWhat to do:\n- Cut off dead branches well below the sick part\n- Clean your cutting tools between each vine\n- Paint pruning cuts with wound paste to protect them\n- Keep vines well-watered - stressed vines get sicker',
  },
  grape_leaf_blight: {
    label: 'Grape Leaf Blight',
    mitigationSteps:
      'Signs to look for: Brown spots on leaves, often near the edges. Leaves may dry out and fall off early.\n\nWhat to do:\n- Remove and destroy leaves with brown spots\n- Train vines on wires so air can move freely\n- Ask for copper or mancozeb spray at your agro shop\n- Water at the base, not on the leaves',
  },
  grape_healthy: {
    label: 'Grape (Healthy)',
    mitigationSteps:
      'Good news! Your grape vine looks healthy.\n\nWhat to do:\n- Keep checking leaves and fruit every week\n- Prune vines to keep good airflow\n- Clean up fallen leaves and old fruit',
  },

  // Orange
  orange_huanglongbing: {
    label: 'Citrus Greening Disease',
    mitigationSteps:
      'Signs to look for: Leaves turn yellow in a blotchy pattern (not all at once). Fruit stays small, lopsided, and green on one side. Fruit tastes bitter. This is a very serious disease.\n\nWhat to do:\n- Look for tiny insects called psyllids on new leaf growth - they spread this disease\n- Ask for insecticide to kill psyllids at your agro shop\n- Sadly, sick trees cannot be cured - remove and burn badly infected trees\n- Only plant new trees from trusted nurseries with disease-free certificates',
  },

  // Peach
  peach_bacterial_spot: {
    label: 'Peach Bacterial Spot',
    mitigationSteps:
      'Signs to look for: Small dark spots on leaves that may fall out, leaving holes (like shotgun damage). Fruit gets dark sunken spots.\n\nWhat to do:\n- Spray copper during the dormant season (before buds open)\n- Do not water from above - keep leaves dry\n- Remove badly spotted branches when pruning\n- Choose resistant peach varieties for new plantings',
  },
  peach_healthy: {
    label: 'Peach (Healthy)',
    mitigationSteps:
      'Good news! Your peach tree looks healthy.\n\nWhat to do:\n- Keep watering regularly\n- Check leaves for spots every week\n- Prune dead branches each year',
  },

  // Pepper
  pepper_bacterial_spot: {
    label: 'Pepper Bacterial Spot',
    mitigationSteps:
      'Signs to look for: Small, dark, water-soaked spots on leaves. Spots may have yellow edges. Fruit gets raised bumpy spots.\n\nWhat to do:\n- Pull out and throw away badly sick plants\n- Ask for copper spray at your agro shop - spray every 7-10 days in wet weather\n- Use clean seed from a trusted source\n- Do not plant peppers or tomatoes in the same spot for 2 years',
  },
  pepper_healthy: {
    label: 'Pepper (Healthy)',
    mitigationSteps:
      'Good news! Your pepper plant looks healthy.\n\nWhat to do:\n- Keep watering regularly at the base\n- Check leaves every week for spots\n- Keep weeds away from your pepper plants',
  },

  // Potato
  potato_early_blight: {
    label: 'Potato Early Blight',
    mitigationSteps:
      'Signs to look for: Dark brown spots with rings inside them (like a target or bullseye) on older lower leaves first.\n\nWhat to do:\n- Pick off lower leaves with target-shaped spots\n- Put mulch around the base to stop soil from splashing onto leaves\n- Water at the base, not from above\n- Ask for chlorothalonil or mancozeb spray at your agro shop\n- Do not plant potatoes in the same field next year',
  },
  potato_late_blight: {
    label: 'Potato Late Blight',
    mitigationSteps:
      'Signs to look for: Large dark water-soaked patches on leaves that spread very fast. White fuzzy mold on the underside in wet weather. This is very serious and can destroy a whole field quickly.\n\nWhat to do:\n- ACT FAST - remove and burn all sick plants right away\n- Ask for fungicide at your agro shop immediately\n- Do not water from above\n- Check your field every day during cool, wet weather\n- Use certified clean seed potatoes next season',
  },
  potato_healthy: {
    label: 'Potato (Healthy)',
    mitigationSteps:
      'Good news! Your potato plant looks healthy.\n\nWhat to do:\n- Keep watering regularly\n- Hill up soil around the base of the plant\n- Watch lower leaves for dark spots, especially in wet weather',
  },

  // Raspberry
  raspberry_healthy: {
    label: 'Raspberry (Healthy)',
    mitigationSteps:
      'Good news! Your raspberry plant looks healthy.\n\nWhat to do:\n- Keep watering regularly\n- Check plants every week for any new spots\n- Prune old canes after fruiting',
  },

  // Soybean
  soybean_healthy: {
    label: 'Soybean (Healthy)',
    mitigationSteps:
      'Good news! Your soybean crop looks healthy.\n\nWhat to do:\n- Keep monitoring your field regularly\n- Watch for yellow or brown spots on leaves\n- Rotate with corn or other crops each year',
  },

  // Squash
  squash_powdery_mildew: {
    label: 'Squash Powdery Mildew',
    mitigationSteps:
      'Signs to look for: White powdery patches on top of leaves, like someone dusted them with flour. Starts as small spots and spreads to cover the whole leaf.\n\nWhat to do:\n- Remove leaves that are fully covered in white powder\n- Give plants more space so air can dry the leaves\n- Ask for sulfur spray or neem oil at your agro shop\n- Do not put too much fertilizer - it makes the problem worse',
  },

  // Strawberry
  strawberry_leaf_scorch: {
    label: 'Strawberry Leaf Scorch',
    mitigationSteps:
      'Signs to look for: Many small dark purple spots on leaves. Spots grow together and leaf edges turn brown and dry, looking burnt.\n\nWhat to do:\n- Remove and throw away badly scorched leaves\n- After harvest, mow the bed short and thin out plants\n- Make sure water drains well - plants should not sit in water\n- Ask for captan spray at your agro shop during blooming',
  },
  strawberry_healthy: {
    label: 'Strawberry (Healthy)',
    mitigationSteps:
      'Good news! Your strawberry plant looks healthy.\n\nWhat to do:\n- Keep watering regularly\n- Check leaves every week for purple spots\n- Remove old dead leaves from around the plants',
  },

  // Tomato
  tomato_bacterial_spot: {
    label: 'Tomato Bacterial Spot',
    mitigationSteps:
      'Signs to look for: Small dark spots on leaves that look greasy or water-soaked. Spots may have yellow rings around them. Fruit gets small raised bumps.\n\nWhat to do:\n- Remove and throw away leaves and fruit with spots\n- Ask for copper spray at your agro shop - spray every 5-7 days in wet weather\n- Use clean seeds and seedlings from trusted sources\n- Do not plant tomatoes or peppers in the same spot for 2 years',
  },
  tomato_early_blight: {
    label: 'Tomato Early Blight',
    mitigationSteps:
      'Signs to look for: Dark brown spots with rings inside (like a target) on lower leaves first. Leaves turn yellow around the spots and fall off.\n\nWhat to do:\n- Pick off lower leaves with target-shaped spots\n- Put straw or mulch around the base to stop soil splashing\n- Stake your tomatoes up off the ground\n- Ask for copper spray at your agro shop\n- Do not plant tomatoes in the same spot next year',
  },
  tomato_late_blight: {
    label: 'Tomato Late Blight',
    mitigationSteps:
      'Signs to look for: Large dark patches on leaves that spread very fast. White fuzzy mold on undersides of leaves. Fruit gets large brown greasy spots. This is very serious.\n\nWhat to do:\n- ACT FAST - pull out and burn all sick plants right away before it spreads\n- Ask for fungicide at your agro shop immediately\n- Do not water from above - keep leaves dry\n- Check your garden every day in cool wet weather\n- Use disease-free seedlings next season',
  },
  tomato_leaf_mold: {
    label: 'Tomato Leaf Mold',
    mitigationSteps:
      'Signs to look for: Yellow spots on top of leaves. Olive-green or brown fuzzy mold on the underside of leaves. Common in greenhouses.\n\nWhat to do:\n- Open doors and vents to let more air in\n- Remove leaves with mold and throw them away\n- Water at the base, never on the leaves\n- Space plants further apart for better airflow\n- Ask for copper spray at your agro shop if needed',
  },
  tomato_septoria: {
    label: 'Tomato Septoria Leaf Spot',
    mitigationSteps:
      'Signs to look for: Many small round spots with gray centers and dark edges on lower leaves. Leaves turn yellow and fall off from the bottom up.\n\nWhat to do:\n- Pick off lower leaves with many spots\n- Put mulch around the base to stop soil from splashing up\n- Water at the base, not from above\n- Ask for copper or chlorothalonil spray at your agro shop\n- Do not plant tomatoes in the same spot next year',
  },
  tomato_spider_mites: {
    label: 'Tomato Spider Mites',
    mitigationSteps:
      'Signs to look for: Tiny yellow or white dots on leaves. Leaves look dusty or bronzed. You may see very thin webs on the underside of leaves. These are very tiny bugs.\n\nWhat to do:\n- Spray the underside of leaves with a strong stream of water to knock them off\n- Ask for neem oil or insecticidal soap at your agro shop - spray every 5-7 days\n- Do not use strong bug killer sprays - they kill the good bugs that eat mites\n- Ladybugs eat mites - encourage them in your garden',
  },
  tomato_target_spot: {
    label: 'Tomato Target Spot',
    mitigationSteps:
      'Signs to look for: Brown spots with lighter rings inside (like a target) on leaves. Similar to early blight but can appear on any leaves, not just lower ones.\n\nWhat to do:\n- Remove leaves with target-shaped brown spots\n- Stake or cage your tomato plants for better airflow\n- Water at the base, not from above\n- Ask for fungicide spray at your agro shop\n- Keep your garden clean of old plant material',
  },
  tomato_yellow_curl: {
    label: 'Tomato Yellow Leaf Curl Virus',
    mitigationSteps:
      'Signs to look for: Leaves curl upward and turn yellow at the edges. New growth is stunted and plants stop producing fruit. Spread by tiny white flies.\n\nWhat to do:\n- Look for small white flies on the underside of leaves - they spread this virus\n- Use yellow sticky traps to catch whiteflies\n- Pull out and burn sick plants - there is no cure for this virus\n- Cover new plants with fine mesh netting to keep whiteflies away\n- Ask for insecticide to control whiteflies at your agro shop\n- Choose resistant tomato varieties for next season',
  },
  tomato_mosaic: {
    label: 'Tomato Mosaic Virus',
    mitigationSteps:
      'Signs to look for: Leaves have a mix of light green and dark green patches (mosaic pattern). Leaves may be twisted or curled. Fruit may have brown streaks inside.\n\nWhat to do:\n- Pull out and burn sick plants - there is no cure for this virus\n- Wash your hands well with soap before touching other plants\n- Clean all tools with bleach water (1 part bleach, 9 parts water) between plants\n- Do not smoke near tomatoes - tobacco can carry this virus\n- Use virus-free seed from trusted sources next season',
  },
  tomato_healthy: {
    label: 'Tomato (Healthy)',
    mitigationSteps:
      'Good news! Your tomato plant looks healthy.\n\nWhat to do:\n- Keep watering regularly at the base\n- Check leaves every week for spots or color changes\n- Stake up your plants for good airflow\n- Remove lower leaves that touch the ground',
  },
};

export function getDiseaseInfo(diseaseId: string): DiseaseLookupEntry {
  return (
    diseaseLookup[diseaseId] ?? {
      label: 'Unknown Disease',
      mitigationSteps:
        'We could not identify this disease clearly.\n\nWhat to do:\n- Try taking another photo in better light\n- Make sure the leaf fills most of the photo\n- Show the photo to your local agricultural officer for help',
    }
  );
}
