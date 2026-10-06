/**
 * NEXT LEVEL — Site content
 * ------------------------------------------------------------
 * All player copy below is transcribed from the text files in
 * /students/<Player>/Profile/*.txt and /students/<Player>/Drills/<Drill>/*.txt
 *
 * To add a player:  copy one of the objects in `players`, update the
 * paths to match the new folder, then run `npm run media` to generate
 * video posters.
 */
(function () {
  /* ---------- Shared drill copy (Kegan's two backhand breakdowns use identical text) ---------- */
  const backhandFundamentals = {
    eyebrow: "Core Technical Elements",
    title: "Fundamentals of a High-Quality Backhand",
    cards: [
      { label: "Stance & Balance", text: "Weight properly distributed with knees flexed" },
      { label: "Preparation", text: "Full shoulder turn with early racket takeback" },
      { label: "Swing Path", text: "Controlled low-to-high motion for optimal topspin" },
      { label: "Follow-Through", text: "Complete finish with shoulder rotation" },
    ],
  };
  const backhandBreakdown = {
    eyebrow: "Frame by Frame",
    title: "Technical Breakdown",
    groupStyle: "numbered",
    groups: [
      {
        title: "Preparation Phase",
        points: [
          "Kegan demonstrates excellent shoulder rotation prior to contact",
          "Notice the consistent unit turn on each repetition",
          "Racket preparation begins as the ball crosses the net",
        ],
      },
      {
        title: "Swing Execution",
        points: [
          "Smooth acceleration through the contact zone",
          "Arm extension maintained through impact",
          "Weight transfer from back foot to front foot",
        ],
      },
      {
        title: "Follow-Through",
        points: [
          "Complete finish position with racket head over the shoulder",
          "Balanced recovery position after each stroke",
        ],
      },
    ],
  };
  const backhandProgression = {
    eyebrow: "Recommended Training Drill",
    title: "Progressive Backhand Development",
    groupStyle: "timeline",
    groups: [
      { title: "Shadow Swings", points: ["10 repetitions focusing on complete motion", "Emphasize shoulder turn and full follow-through"] },
      { title: "Self-Fed Practice", points: ["Drop-feed from service line", "Concentrate on clean contact and extension"] },
      { title: "Cross-Court Rally", points: ["Sustain 15+ consecutive shots", "Maintain consistent depth and spin"] },
    ],
  };
  const groundstrokeTips = {
    eyebrow: "Coach's Checklist",
    title: "Key Technique Tips",
    groupStyle: "numbered",
    groups: [
      {
        title: "Footwork & Positioning",
        points: [
          "Turn sideways early (unit turn) to prepare for the shot.",
          "Step into the ball with your front foot pointing toward the target.",
        ],
      },
      {
        title: "Swing & Contact",
        points: [
          "Low-to-high swing for topspin and control.",
          "Contact point slightly in front of your body for power.",
          "Follow through over your shoulder to keep the ball deep.",
        ],
      },
      {
        title: "Target Deep & Wide",
        points: ["Aim for the back third of the diagonal court to push your opponent back."],
      },
    ],
  };
  const backhandLevels = {
    beginner: {
      title: "Beginner Drill",
      items: [
        "Shadow swings: Practice full motion without ball",
        "Short-distance wall hits: Focus on clean contact",
        "Add small steps between shots",
      ],
    },
    advanced: {
      title: "Advanced Drill",
      items: [
        "Alternate crosscourt/down-the-line on coach's feed",
        "Add recovery sprints after each shot",
        "Finish with approach-and-volley sequence",
      ],
    },
  };

  const K = "students/Kegan B";
  const M = "students/Madison S";

  window.NL_CONTENT = {
    brand: {
      name: "Next Level",
      tagline: "Private Tennis Coaching & Video Analysis",
    },

    players: [
      /* =====================================================================
         KEGAN B
         ===================================================================== */
      {
        id: "kegan-b",
        name: "Kegan Barkley",
        firstName: "Kegan",
        lastName: "Barkley",
        report: "Training Report — August 2025",
        reportShort: "Aug 2025",
        cover: `${K}/Profile/slideshow/kb-forehand.png`,
        portrait: `${K}/Profile/slideshow/kb-bh-side.png`,
        portraitPosition: "45% 30%",
        slideshow: [
          { src: `${K}/Profile/slideshow/kb-forehand.png`, caption: "Forehand" },
          { src: `${K}/Profile/slideshow/kb-bh-side.png`, caption: "Backhand — Side View" },
          { src: `${K}/Profile/slideshow/kb-back-forth.png`, caption: "Forehand — Forward & Backward" },
          { src: `${K}/Profile/slideshow/kb-side-serve.png`, caption: "Side Serve" },
          { src: `${K}/Profile/slideshow/KB-bh-front.png`, caption: "Backhand — Front View" },
          { src: `${K}/Profile/slideshow/kb-crosscourt.png`, caption: "Forehand & Backhand Cross Court" },
        ],
        strengths: [
          "Move opponents with good placement in the corners.",
          "Forehand cross court.",
          "Angle shots to open the court.",
          "Backhand approach.",
        ],
        weaknesses: [
          "Approach shot with forehand short balls recognition and execution.",
          "Needs more pace and power in the backhand.",
          "Explosive footwork to set up quicker to the balls and move forward to the drop shots, taking adjustment steps when getting closer to the balls.",
          "Recover to the right position, stay away from no man's land.",
          "2nd serve technique, pace on his serve.",
        ],
        strokes: [
          {
            title: "Forehand",
            points: [
              "Backswing needs to place the racquet head lower at level with his head.",
              "Extending the elbow after contact point. Lead with the edge of the racket. Hit the ball in front.",
              "Needs more coil / rotation as he takes the racquet back.",
              "Uncoil activating the right hip.",
              "Elbow at contact needs to be further away from the body.",
            ],
          },
          {
            title: "Backhand",
            points: [
              "Power starts with a strong and powerful coil and preparation with the entire body and not just his arm / racquet.",
              "The position of the racquet in the backswing needs to be highest to generate racquet speed. Drop the head of the racket in a straight line.",
              "Use the legs and get body weight to uncoil to contact and extend through the shot.",
              "Keep the right elbow further away from the body as he follows through and finishes the shot.",
            ],
          },
          {
            title: "Serve",
            points: [
              "Rotate with the hips to start the motion instead of relying mainly on the upper body and arm/racquet.",
              "Separate the motion into 2 parts: coil + uncoil.",
              "Needs to extend fully to contact (right arm to ear to improve right position of the arm to contact the ball).",
              "Keep the head of the racket closed. Use pronation on the follow-through.",
            ],
          },
        ],
        note: [
          "Kegan is super athletic and needs to work in his fitness and strength training so he can become a more aggressive and powerful player.",
          "With higher intensity and more aggression in his game he will build more confidence which will translate in many more wins and success in his tournaments.",
          "He needs to go for winning shots on important points without being afraid to miss.",
        ],
        videos: [
          { src: `${K}/Videos/Kegan-Fh-demo.mp4`, title: "Forehand", tag: "Side View" },
          { src: `${K}/Videos/Kegan-Backahnd-Side-Demo.mp4`, title: "Backhand", tag: "Side View" },
          { src: `${K}/Videos/kegan-Bh-Infront-Demo.mp4`, title: "Backhand", tag: "Front View" },
          { src: `${K}/Videos/Kegan-Side-serve-Demo.mp4`, title: "Serve", tag: "Side View" },
        ],
        drills: [
          {
            id: "forehand",
            title: "Forehand",
            category: "Forehand",
            view: "Side View",
            video: `${K}/Drills/forehand/Kegan-Fh-demo.mp4`,
            overview:
              "This video breakdown showcases Kegan executing a series of forehands from a side-view perspective, providing valuable insights into proper stroke mechanics. Let's analyze the key components of an effective forehand.",
            sections: [
              {
                eyebrow: "Core Technical Elements",
                title: "Fundamentals of a Powerful Forehand",
                cards: [
                  { label: "Stance & Balance", text: "Weight evenly distributed with knees flexed, ready to move in any direction." },
                  { label: "Preparation", text: "Early shoulder rotation and unit turn to create coil for maximum power." },
                  { label: "Swing Path", text: "Smooth low-to-high motion generating optimal topspin and control." },
                  { label: "Follow-Through", text: "Full extension across the body with chest opening toward the target." },
                ],
                footnote:
                  "This technical breakdown highlights the key components of an effective forehand, demonstrated through clear, repeatable mechanics.",
              },
              {
                eyebrow: "Frame by Frame",
                title: "Technical Breakdown",
                groupStyle: "numbered",
                groups: [
                  {
                    title: "Preparation Phase",
                    points: [
                      "Unit turn initiates as soon as ball direction is recognized",
                      "Racket back early with non-dominant hand supporting the throat",
                      "Weight loading onto back foot in coiled position",
                    ],
                  },
                  {
                    title: "Swing Execution",
                    points: [
                      "Acceleration starts from the ground up – legs → hips → shoulders → arm",
                      "Contact point slightly in front of the body for optimal power",
                      "Firm wrist through impact zone for solid ball striking",
                    ],
                  },
                  {
                    title: "Follow-Through",
                    points: [
                      "Finish over shoulder with racket head pointing downward",
                      "Recovery step immediately after contact to regain position",
                      "Eyes remain focused on contact zone through entire motion",
                    ],
                  },
                ],
              },
              {
                eyebrow: "Coach's Checklist",
                title: "Key Technique Tips",
                groupStyle: "numbered",
                groups: [
                  {
                    title: "Footwork Essentials",
                    points: [
                      "Split step as opponent makes contact",
                      "Adjustment steps to perfect spacing from ball",
                      "Strong base with feet wider than shoulders for stability",
                    ],
                  },
                  {
                    title: "Swing Mechanics",
                    points: [
                      "Keep swing compact on faster balls",
                      "Extend follow-through for added topspin and depth",
                      "Relaxed grip pressure (4/10 tension) for fluid motion",
                    ],
                  },
                  {
                    title: "Tactical Targets",
                    points: [
                      "Deep crosscourt to neutralize opponents",
                      "Short angle to pull player off court",
                      "Down-the-line for offensive opportunities",
                    ],
                  },
                ],
              },
            ],
            levels: {
              beginner: {
                title: "Form Foundations",
                items: [
                  "Shadow swings: 20 reps focusing on full motion",
                  "Self-fed drop hits: Emphasize clean contact",
                  "Mini-court rallies: Short distance control practice",
                ],
              },
              advanced: {
                title: "Match Simulation",
                items: [
                  "Directional control: 5 crosscourt, 5 down-the-line alternating",
                  "Depth variation: Alternate deep/short balls on coach's feed",
                  "Combination patterns: Approach shot followed by volley finish",
                ],
              },
            },
          },
          {
            id: "backhand-front-view",
            title: "Backhand Front View",
            category: "Backhand",
            view: "Front View",
            video: `${K}/Drills/backhand front view/kegan-Bh-Infront-Demo.mp4`,
            overview:
              "This video breakdown showcases Kegan executing a series of backhands from a front-view perspective, providing valuable insights into proper stroke mechanics. Let's analyze the key components of an effective backhand.",
            sections: [backhandFundamentals, backhandBreakdown, backhandProgression, groundstrokeTips],
            levels: backhandLevels,
          },
          {
            id: "backhand-side-view",
            title: "Backhand Side View",
            category: "Backhand",
            view: "Side View",
            video: `${K}/Drills/backhand side view/Kegan-Backahnd-Side-Demo.mp4`,
            overview:
              "This video breakdown showcases Kegan executing a series of backhands from a side-view perspective, providing valuable insights into proper stroke mechanics. Let's analyze the key components of an effective backhand.",
            sections: [backhandFundamentals, backhandBreakdown, backhandProgression, groundstrokeTips],
            levels: backhandLevels,
          },
          {
            id: "forehand-backhand-cross-court",
            title: "Forehand Backhand Cross Court",
            category: "Groundstrokes",
            view: "Drill",
            video: `${K}/Drills/forehand backhand cross court/Kegan-Fh-cross-court-plus-bh-cross-court-drill-demo.mp4`,
            overview:
              "This comprehensive drill progression develops stroke reliability while integrating tactical awareness and physical demands of match play. The structured approach allows players to methodically build competence before adding complexity.",
            sections: [
              {
                eyebrow: "Core Technical Elements",
                title: "Fundamentals of Crosscourt Shots",
                cards: [
                  { label: "Stance & Balance", text: "Weight properly distributed with knees flexed for stability and quick adjustments." },
                  { label: "Preparation", text: "Full shoulder turn with early racket takeback to ensure proper timing and control." },
                  { label: "Swing Path", text: "Controlled low-to-high motion for optimal topspin and consistency." },
                  { label: "Follow-Through", text: "Complete finish with shoulder rotation to maximize power and accuracy." },
                ],
                footnote:
                  "This breakdown highlights the mechanics of effective crosscourt shots, emphasizing proper alignment, swing path, and body positioning—essential for players refining their technique.",
              },
              {
                eyebrow: "Frame by Frame",
                title: "Technical Breakdown",
                groupStyle: "numbered",
                groups: [
                  {
                    title: "Preparation Phase",
                    points: [
                      "Shoulder rotation begins as the ball crosses the net, ensuring early setup.",
                      "Unit turn consistency keeps the stroke repeatable under pressure.",
                      "Racket preparation starts early to maintain smooth acceleration.",
                    ],
                  },
                  {
                    title: "Swing Execution",
                    points: [
                      "Acceleration through contact ensures clean ball striking.",
                      "Arm extension at impact maximizes control and depth.",
                      "Weight transfer from back foot to front foot generates power.",
                    ],
                  },
                  {
                    title: "Follow-Through",
                    points: [
                      "High finish over the shoulder maintains topspin and directional control.",
                      "Balanced recovery resets position for the next shot.",
                    ],
                  },
                ],
              },
              {
                eyebrow: "Coach's Checklist",
                title: "Key Technique Tips",
                groupStyle: "numbered",
                groups: [
                  {
                    title: "Footwork & Positioning",
                    points: [
                      "Turn early (unit turn) to align your body with the crosscourt target.",
                      "Step into the shot with your front foot pointing toward the intended angle.",
                    ],
                  },
                  {
                    title: "Swing & Contact",
                    points: [
                      "Low-to-high swing for consistent topspin and net clearance.",
                      "Contact slightly in front of your body for optimal power and control.",
                      "Follow through over the shoulder to maintain depth and spin.",
                    ],
                  },
                  {
                    title: "Target Deep & Wide",
                    points: ["Aim for the back third of the diagonal court to push your opponent back and open the court."],
                  },
                ],
              },
            ],
            levels: {
              beginner: {
                title: "Beginner Drill",
                items: [
                  "Shadow swings: Practice the full motion without a ball.",
                  "Short-distance wall hits: Focus on clean contact and swing path.",
                  "Add small steps: Incorporate footwork between shots.",
                ],
              },
              advanced: {
                title: "Advanced Drill",
                items: [
                  "Alternate crosscourt/down-the-line on coach's feed.",
                  "Add recovery sprints after each shot to simulate match play.",
                  "Finish with an approach-and-volley sequence to integrate net play.",
                ],
              },
            },
          },
          {
            id: "forehand-going-forward-and-backward",
            title: "Forehand Going Forward and Backward",
            category: "Footwork",
            view: "Drill",
            video: `${K}/Drills/forehand going forward and backward/Kegan-Fh-cross-court-plus-bh-cross-court-drill-demo.mp4`,
            overview:
              "This technical breakdown examines proper forehand mechanics when moving forward to attack and backward to defend, using professional fundamentals for optimal court coverage.",
            sections: [
              {
                eyebrow: "Core Technical Elements",
                title: "Fundamentals of Dynamic Forehand Play",
                cards: [
                  { label: "Stance & Balance", text: "Athletic base with weight transfer coordinated to movement direction" },
                  { label: "Preparation", text: "Early unit turn adjusted for incoming ball depth" },
                  { label: "Swing Path", text: "Modified follow-through based on court position" },
                  { label: "Recovery", text: "Efficient reset steps after each stroke" },
                ],
              },
              {
                eyebrow: "Frame by Frame",
                title: "Technical Breakdown",
                groupStyle: "numbered",
                groups: [
                  {
                    title: "Preparation Phase",
                    points: [
                      "Forward Movement: Shorter backswing when approaching",
                      "Backward Movement: Extended takeback when retreating",
                      "Footwork: Adjusts between attacking steps (forward) and defensive shuffles (back)",
                    ],
                  },
                  {
                    title: "Swing Execution",
                    points: [
                      "Forward Swing: Compact motion with upward finish for approach shots",
                      "Backward Swing: Full extension with deeper base for defensive replies",
                      "Contact Point: Maintains consistent impact zone despite movement",
                    ],
                  },
                  {
                    title: "Follow-Through",
                    points: [
                      "Forward Finish: Shorter across body for volley preparation",
                      "Backward Finish: Full high finish for depth and stability",
                    ],
                  },
                ],
              },
              {
                eyebrow: "Recommended Training Drill",
                title: "Progressive Forehand Development",
                groupStyle: "timeline",
                groups: [
                  { title: "Shadow Swings", points: ["10 repetitions focusing on complete motion", "Emphasize shoulder turn and full follow-through"] },
                  { title: "Self-Fed Practice", points: ["Drop-feed from service line", "Concentrate on clean contact and extension"] },
                  { title: "Cross-Court Rally", points: ["Sustain 15+ consecutive shots", "Maintain consistent depth and spin"] },
                ],
              },
              {
                eyebrow: "Coach's Checklist",
                title: "Key Technique Tips",
                groupStyle: "numbered",
                groups: [
                  { title: "Footwork Adjustments", points: ["Small adjustment steps when moving forward", "Cross-over steps when recovering backward"] },
                  { title: "Swing Adaptation", points: ["Compact swing on short balls", "Extended swing on deep balls"] },
                  { title: "Target Priorities", points: ["Angle creation when moving forward", "Depth control when moving back"] },
                ],
              },
            ],
            levels: {
              beginner: {
                title: "Beginner Drill",
                items: [
                  "Shadow swings with forward/backward steps",
                  "Self-fed balls alternating between service line and baseline",
                  "Mini-court rallies emphasizing position changes",
                ],
              },
              advanced: {
                title: "Advanced Drill",
                items: [
                  "Coach feeds alternating short/deep balls",
                  "Required recovery to designated court position after each shot",
                  "Finish sequence with approach shot and volley combination",
                ],
              },
            },
          },
          {
            id: "side-serve",
            title: "Side Serve",
            category: "Serve",
            view: "Side View",
            video: `${K}/Drills/side serve/Kegan-Side-serve-Demo.mp4`,
            overview:
              "This side-view perspective provides the clearest way to analyze and correct serve mechanics. The progressive drills allow players to develop proper technique before adding power. For maximum improvement, record your own side-view serves to compare with these technical benchmarks.",
            sections: [
              {
                eyebrow: "Core Technical Elements",
                title: "Fundamentals of an Effective Serve",
                cards: [
                  { label: "Stance & Balance", text: "Feet positioned comfortably with front foot at 45° angle, weight evenly distributed" },
                  { label: "Ball Toss", text: "Consistent release point slightly in front and to the right (for right-handers)" },
                  { label: "Swing Path", text: "Smooth trophy position to explosive upward contact" },
                  { label: "Follow-Through", text: "Full extension with natural pronation and weight transfer" },
                ],
                footnote:
                  "This side-view analysis reveals the serve's kinetic chain from ground up, highlighting proper sequencing for power and consistency.",
              },
              {
                eyebrow: "Frame by Frame",
                title: "Technical Breakdown",
                groupStyle: "numbered",
                groups: [
                  {
                    title: "Preparation Phase",
                    points: [
                      "Feet alignment establishes serving platform",
                      "Toss arm extension creates consistent ball placement",
                      "Knee bend loads power from lower body",
                    ],
                  },
                  {
                    title: "Swing Execution",
                    points: [
                      "Trophy position forms proper shoulder alignment",
                      "Racket drop creates whip-like acceleration",
                      "Contact point at full extension maximizes power",
                    ],
                  },
                  {
                    title: "Follow-Through",
                    points: [
                      "Pronation occurs naturally through impact",
                      "Landing inside baseline maintains balance",
                      "Recovery prepares for next shot",
                    ],
                  },
                ],
              },
              {
                eyebrow: "Coach's Checklist",
                title: "Key Technique Tips",
                groupStyle: "numbered",
                groups: [
                  { title: "Toss Consistency", points: ["Release at shoulder height", "Minimal spin on ball", "Same placement for flat and spin serves"] },
                  { title: "Power Generation", points: ["Leg drive initiates motion", "Hip rotation precedes shoulder rotation", "Arm acts as whip not muscle"] },
                  { title: "Target Focus", points: ["Deep in service box for first serves", "Higher clearance for second serves", "Use body alignment to direct serve"] },
                ],
              },
            ],
            levels: {
              beginner: {
                title: "Building Blocks",
                items: [
                  "Toss practice: 20 reps focusing on placement",
                  "Shadow serves: Full motion without ball",
                  "Half-speed serves: Emphasize proper form",
                ],
              },
              advanced: {
                title: "Precision Training",
                items: [
                  "Target serving: Alternate corners on command",
                  "Speed progression: 50%, 75%, 100% effort",
                  "Second serve focus: Kick/topspin consistency",
                ],
              },
            },
          },
        ],
      },

      /* =====================================================================
         MADISON S
         ===================================================================== */
      {
        id: "madison-s",
        name: "Madison Staine",
        firstName: "Madison",
        lastName: "Staine",
        report: "Training Report — August 2025",
        reportShort: "Aug 2025",
        cover: `${M}/Profile/madison feature.png`,
        portrait: "assets/media/madison-portrait.jpg",
        portraitFallback: `${M}/Profile/madison-profile.png`,
        portraitPosition: "50% 30%",
        slideshow: [
          { src: `${M}/Profile/slideshow/madison-in-action.png`, caption: "In Action" },
          { src: `${M}/Profile/slideshow/madison-fh.png`, caption: "Forehand" },
          { src: `${M}/Profile/slideshow/madison-serve.png`, caption: "Serve" },
          { src: `${M}/Profile/slideshow/madison-bh.png`, caption: "Backhand" },
          { src: `${M}/Profile/slideshow/utr.png`, caption: "Under the Rope" },
          { src: `${M}/Profile/slideshow/utr2.png`, caption: "Under the Rope — Going Forward" },
        ],
        strengths: [
          "Move opponents with good placement in the corners.",
          "Forehand cross court.",
          "Angle shots to open the court.",
          "Backhand approach.",
        ],
        weaknesses: [
          "Approach shot with forehand short balls recognition and execution.",
          "Needs more pace and power in the backhand.",
          "Explosive footwork to set up quicker to the balls and move forward to the drop shots, taking adjustment steps when getting closer to the balls.",
          "Recover to the right position, stay away from no man's land.",
          "2nd serve technique, pace on her serve.",
        ],
        strokes: [
          {
            title: "Forehand",
            points: [
              "Backswing needs to place the racquet head lower at level with her head.",
              "Extending the elbow after contact point. Lead with the edge of the racket. Hit the ball in front.",
              "Needs more coil / rotation as she takes the racquet back.",
              "Uncoil activating the right hip.",
              "Elbow at contact needs to be further away from the body.",
            ],
          },
          {
            title: "Backhand",
            points: [
              "Power starts with a strong and powerful coil and preparation with the entire body and not just her arm / racquet.",
              "The position of the racquet in the backswing needs to be highest to generate racquet speed. Drop the head of the racket in a straight line.",
              "Use the legs and get body weight to uncoil to contact and extend through the shot.",
              "Keep the right elbow further away from the body as she follows through and finishes the shot.",
            ],
          },
          {
            title: "Serve",
            points: [
              "Rotate with the hips to start the motion instead of relying mainly on the upper body and arm/racquet.",
              "Separate the motion into 2 parts: coil + uncoil.",
              "Needs to extend fully to contact (right arm to ear to improve right position of the arm to contact the ball).",
              "Keep the head of the racket closed. Use pronation on the follow-through.",
            ],
          },
        ],
        note: [
          "Madison is super athletic and needs to work in her fitness and strength training so she can become a more aggressive and powerful player.",
          "With higher intensity and more aggression in her game she will build more confidence which will translate in many more wins and success in her tournaments.",
          "She needs to go for winning shots on important points without being afraid to miss.",
        ],
        videos: [
          { src: `${M}/Videos/side-Forhand.mp4`, title: "Forehand", tag: "Side View" },
          { src: `${M}/Videos/maddie-side-bh.mp4`, title: "Backhand", tag: "Side View" },
          // side-Forhand-1.mp4 and side-Forhand-2.mp4 are byte-identical copies of side-Forhand.mp4,
          // so they're left out of the catalog. Add them back here if they get replaced with new clips.
        ],
        drills: [
          {
            id: "attacking-with-forehand-cross-court",
            title: "Attacking with Forehand Cross Court",
            category: "Tactics",
            view: "Drill",
            video: `${M}/Drills/Attacking with forehand cross court/atacking-with-fh-cross-court-and-inside-out-fh.mp4`,
            overview:
              "Want to control the game and keep your opponent running? The forehand cross-court shot is one of the most effective ways to move your opponent and create offensive opportunities. In this lesson, we'll break down the technique, footwork, and strategy—plus a fun drill to practice!",
            sections: [
              {
                eyebrow: "The Game Plan",
                title: "Tactic",
                intro: [
                  "Playing the ball crosscourt and down the line to move the opponent.",
                  "A cross-court forehand is a shot hit diagonally from one side of the court to the other.",
                ],
                listTitle: "Why use it?",
                list: [
                  "Longer diagonal court = more margin for error.",
                  "Forces the opponent to cover more distance.",
                  "Opens up the court for winners (down-the-line or inside-out shots later).",
                ],
              },
              {
                eyebrow: "On Court",
                title: "Activity",
                intro: [
                  "Using the red court area players stand at home base (recovery) with one player pushing the ball cross-court then down the line while the other player always pushes back to the same corner. Players continuously exchange the ball along the ground. The rally is over if the ball goes out of the playing area or bounces off the ground. Players with the longest rally win.",
                  "Players in pairs cooperatively share a ball using a crosscourt forehand groundstroke. Players count the number of rallies in 2 minutes.",
                ],
                figures: [
                  { src: `${M}/Drills/Attacking with forehand cross court/cross-court-Edited.png`, caption: "Cross court then down the line" },
                  { src: `${M}/Drills/Attacking with forehand cross court/cross-Edited.png`, caption: "Cross court rally pattern" },
                ],
              },
              {
                eyebrow: "For Coaches & Parents",
                title: "Fundamental Teaching Points",
                listStyle: "numbered",
                list: [
                  "Ensure players are in a set up sideways position when receiving and sending the ball.",
                  "Ensure players impact the ball with strings facing the target.",
                  "Ensure players recover to home base.",
                ],
              },
              groundstrokeTips,
            ],
          },
          {
            id: "under-the-rope-going-forward",
            title: "Under the Rope Going Forward",
            category: "Footwork",
            view: "Drill",
            video: `${M}/Drills/Under The Rope Going Forward/under-the-rope-going-forward.mp4`,
            overview:
              "Want explosive movement and stronger groundstrokes? This \u201cUnder the Rope\u201d drill trains players to generate power from their legs while maintaining balance and posture—even in a low stance. Perfect for beginners learning proper footwork!",
            sections: [
              {
                eyebrow: "The Game Plan",
                title: "Tactic",
                intro: [
                  "Take your footwork to the next level with this variation of our popular \u201cUnder the Rope\u201d drill! This version focuses on back-and-forth movement, teaching players to maintain posture while changing directions – crucial for covering wide shots and recovering to center.",
                ],
              },
              {
                eyebrow: "On Court",
                title: "Activity",
                groupStyle: "timeline",
                groups: [
                  {
                    title: "Starting Position",
                    points: [
                      "Begin in athletic stance 2 feet left of rope (for right-handed players)",
                      "Weight on outside (right) foot, ready to push",
                    ],
                  },
                  {
                    title: "Movement Sequence",
                    points: [
                      "Shuffle step toward rope",
                      "Deep knee bend as approaching (hips back, chest up)",
                      "Powerful push-off with left leg to go under",
                      "Immediate shuffle recovery back after clearing",
                      "Explode forward to far cone",
                    ],
                  },
                ],
                footnote:
                  "Players in pairs cooperatively share a ball using a crosscourt forehand groundstroke. Players count the number of rallies in 2 minutes.",
                figures: [
                  { src: `${M}/Drills/Under The Rope Going Forward/utr.png`, caption: "Low stance under the rope" },
                  { src: `${M}/Drills/Under The Rope Going Forward/utr2.png`, caption: "Driving forward after clearing" },
                ],
              },
              {
                eyebrow: "For Coaches & Parents",
                title: "Fundamental Teaching Points",
                listStyle: "numbered",
                list: [
                  "Ensure players are in a set up north-south position when receiving and sending the ball.",
                  "Ensure players impact the ball with strings facing the target.",
                  "Ensure players recover to home base.",
                ],
              },
              {
                eyebrow: "Coach's Checklist",
                title: "Key Technique Tips",
                groupStyle: "numbered",
                groups: [
                  {
                    title: "Posture is Everything",
                    points: [
                      "Keep your chest up and spine straight when bending (hinge at hips, not waist)",
                      "Eyes forward – imagine watching the ball over the net even when low",
                    ],
                  },
                  {
                    title: "Leg Engagement",
                    points: [
                      "Load weight into your quads and glutes when descending",
                      "Push through the balls of your feet for explosive upward drive",
                    ],
                  },
                  {
                    title: "Arm Positioning",
                    points: [
                      "Maintain light racket prep (elbow bent at 90°) even when low",
                      "Free arm extends slightly for balance",
                    ],
                  },
                  {
                    title: "Breathing Control",
                    points: ["Exhale sharply when pushing up to engage core muscles"],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
})();
