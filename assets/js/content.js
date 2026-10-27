/**
 * NEXT LEVEL — Site content
 * ------------------------------------------------------------
 * Student training portal data for Next Level Tennis.
 * Authentic coaching notes and video analysis breakdowns.
 */
(function () {
  const K = "students/Kegan B";
  const M = "students/Madison S";
  const S = "students/Sayf B";

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
        videos: [
          { src: `${K}/Videos/Kegan-Fh-demo.mp4`, title: "Forehand", tag: "Side View" },
          { src: `${K}/Videos/Kegan-Backahnd-Side-Demo.mp4`, title: "Backhand", tag: "Side View" },
          { src: `${K}/Videos/kegan-Bh-Infront-Demo.mp4`, title: "Backhand", tag: "Front View" },
          { src: `${K}/Videos/Kegan-Side-serve-Demo.mp4`, title: "Serve", tag: "Side View" },
        ],
        drills: [
          {
            id: "forehand",
            title: "Forehand Analysis",
            category: "Forehand",
            view: "Side View",
            video: `${K}/Drills/forehand/Kegan-Fh-demo.mp4`,
            overview:
              "Kegan – Forehand Mechanics: Backswing, Elbow Extension, Unit Turn Coil & Hip Activation.",
            sections: [
              {
                eyebrow: "Technical Focus",
                title: "Forehand Mechanics",
                cards: [
                  { label: "Backswing Height", text: "Place the racquet head lower at level with the head during backswing." },
                  { label: "Extension & Contact", text: "Extend the elbow after contact point. Lead with the edge of the racket and hit the ball in front." },
                  { label: "Shoulder Coil", text: "Create more coil and shoulder rotation when taking the racquet back." },
                  { label: "Hip Activation", text: "Uncoil into the stroke by activating the right hip." },
                  { label: "Elbow Spacing", text: "Keep the elbow further away from the body at contact for leverage and power." },
                ],
              },
            ],
          },
          {
            id: "backhand-front-view",
            title: "Backhand (Front View)",
            category: "Backhand",
            view: "Front View",
            video: `${K}/Drills/backhand front view/kegan-Bh-Infront-Demo.mp4`,
            overview:
              "Kegan – Backhand (Front View): Full Body Coil, Racquet Path, Leg Drive & Extension.",
            sections: [
              {
                eyebrow: "Technical Focus",
                title: "Backhand (Front View)",
                cards: [
                  { label: "Body Coil", text: "Power starts with a strong and powerful coil with the entire body and not just the arm/racquet." },
                  { label: "Racquet Position", text: "The position of the racquet in the backswing needs to be highest to generate racquet speed. Drop the head of the racket in a straight line." },
                  { label: "Leg Drive & Extension", text: "Use the legs and get body weight to uncoil to contact and extend through the shot." },
                  { label: "Elbow Spacing", text: "Keep the right elbow further away from the body on the follow-through and finishing position." },
                ],
              },
            ],
          },
          {
            id: "backhand-side-view",
            title: "Backhand (Side View)",
            category: "Backhand",
            view: "Side View",
            video: `${K}/Drills/backhand side view/Kegan-Backahnd-Side-Demo.mp4`,
            overview:
              "Kegan – Backhand (Side View): Stance, Unit Turn, Swing Path & Follow-Through.",
            sections: [
              {
                eyebrow: "Technical Focus",
                title: "Backhand (Side View)",
                cards: [
                  { label: "Stance & Balance", text: "Weight properly distributed with knees flexed for dynamic stability." },
                  { label: "Preparation", text: "Full shoulder turn with early racket takeback before ball bounce." },
                  { label: "Swing Path", text: "Controlled low-to-high motion for optimal topspin and penetration." },
                  { label: "Follow-Through", text: "Complete finish with shoulder rotation and balanced recovery." },
                ],
              },
            ],
          },
          {
            id: "forehand-backhand-cross-court",
            title: "Forehand & Backhand Cross Court",
            category: "Groundstrokes",
            view: "Drill",
            video: `${K}/Drills/forehand backhand cross court/Kegan-Fh-cross-court-plus-bh-cross-court-drill-demo.mp4`,
            overview:
              "Kegan – Forehand & Backhand Cross Court: Deep Diagonal Targeting, Early Setup & Court Coverage.",
            sections: [
              {
                eyebrow: "Tactical Execution",
                title: "Cross Court Fundamentals",
                cards: [
                  { label: "Crosscourt Target", text: "Aim for the back third of the diagonal court to push opponent back and open the court." },
                  { label: "Shoulder Rotation", text: "Shoulder rotation begins early as the ball crosses the net for repeatable timing." },
                  { label: "Stepping In", text: "Step into the shot with the front foot aligned toward the crosscourt angle." },
                  { label: "Follow-Through & Reset", text: "High finish over the shoulder maintains topspin; recover quickly to home base." },
                ],
              },
            ],
          },
          {
            id: "forehand-going-forward-and-backward",
            title: "Forehand Forward & Backward",
            category: "Footwork",
            view: "Drill",
            video: `${K}/Drills/forehand going forward and backward/Kegan-Fh-cross-court-plus-bh-cross-court-drill-demo.mp4`,
            overview:
              "Kegan – Forehand Moving Forward & Backward: Footwork Adjustments, Approach Compactness & Defensive Base.",
            sections: [
              {
                eyebrow: "Dynamic Movement",
                title: "Movement & Stroke Adaptation",
                cards: [
                  { label: "Forward Attack", text: "Small adjustment steps when moving forward with a compact swing to take short balls on the rise." },
                  { label: "Backward Defense", text: "Crossover steps when retreating with an extended swing and deep base for court depth." },
                  { label: "Consistent Contact", text: "Maintain strike zone height and arm extension despite lateral or linear movement." },
                  { label: "Rapid Recovery", text: "Reset center of balance immediately after impact to prepare for the reply." },
                ],
              },
            ],
          },
          {
            id: "side-serve",
            title: "Serve (Side View)",
            category: "Serve",
            view: "Side View",
            video: `${K}/Drills/side serve/Kegan-Side-serve-Demo.mp4`,
            overview:
              "Kegan – Serve Analysis (Side View): Hip Initiation, Coil & Uncoil, Full Contact Extension & Pronation.",
            sections: [
              {
                eyebrow: "Technical Focus",
                title: "Serve Analysis",
                cards: [
                  { label: "Hip Initiation", text: "Rotate with the hips to start the motion instead of relying mainly on the upper body and arm." },
                  { label: "Coil & Uncoil", text: "Separate the motion into 2 distinct parts: loaded coil followed by upward uncoil." },
                  { label: "Full Extension", text: "Extend fully to contact (right arm aligned high toward ear for optimal contact height)." },
                  { label: "Pronation & Finish", text: "Keep the head of the racket closed and execute natural pronation on the follow-through." },
                ],
              },
            ],
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
        videos: [
          { src: `${M}/Videos/side-Forhand.mp4`, title: "Forehand", tag: "Side View" },
          { src: `${M}/Videos/maddie-side-bh.mp4`, title: "Backhand", tag: "Side View" },
        ],
        drills: [
          {
            id: "attacking-with-forehand-cross-court",
            title: "Attacking with Forehand Cross Court",
            category: "Tactics",
            view: "Drill",
            video: `${M}/Drills/Attacking with forehand cross court/atacking-with-fh-cross-court-and-inside-out-fh.mp4`,
            overview:
              "Madison – Attacking with Forehand Cross Court: Court Geometry, Sideways Setup & Recovery to Home Base.",
            sections: [
              {
                eyebrow: "Tactical Objective",
                title: "Cross Court Strategy",
                intro: [
                  "Playing the ball crosscourt and down the line to move the opponent. A cross-court forehand is hit diagonally to open the court and maximize margin for error.",
                ],
                listTitle: "Why use it:",
                list: [
                  "Longer diagonal court provides greater margin for error over the lowest part of the net.",
                  "Forces the opponent to cover more court distance laterally.",
                  "Opens up the court for down-the-line and inside-out attacking winners.",
                ],
              },
              {
                eyebrow: "On Court Exercise",
                title: "Rally Drill & Movement Pattern",
                intro: [
                  "Using the red court area, players stand at home base (recovery) with one player pushing the ball cross-court then down the line while the partner pushes back to the target corner.",
                  "Players cooperatively share a ball using a crosscourt forehand groundstroke to sustain rallies and build placement consistency.",
                ],
                figures: [
                  { src: `${M}/Drills/Attacking with forehand cross court/cross-court-Edited.png`, caption: "Cross court then down the line drill pattern" },
                  { src: `${M}/Drills/Attacking with forehand cross court/cross-Edited.png`, caption: "Cross court diagonal rally exchange" },
                ],
              },
              {
                eyebrow: "Key Coaching Cues",
                title: "Fundamental Teaching Points",
                cards: [
                  { label: "Sideways Setup", text: "Ensure player is set up in a sideways position (unit turn) early when receiving and sending the ball." },
                  { label: "Strings Facing Target", text: "Impact the ball cleanly in front with strings facing the intended target crosscourt." },
                  { label: "Home Base Recovery", text: "Recover to home base immediately after each stroke to maintain balanced court coverage." },
                ],
              },
            ],
          },
          {
            id: "under-the-rope-going-forward",
            title: "Under the Rope Going Forward",
            category: "Footwork",
            view: "Drill",
            video: `${M}/Drills/Under The Rope Going Forward/under-the-rope-going-forward.mp4`,
            overview:
              "Madison – Under the Rope Going Forward: Low Posture, Leg Power Drive & Explosive Recovery.",
            sections: [
              {
                eyebrow: "Drill Purpose",
                title: "Dynamic Footwork & Power",
                intro: [
                  "This drill trains players to generate explosive power from the legs while maintaining balance and low posture—essential for covering wide shots and changing directions quickly.",
                ],
              },
              {
                eyebrow: "Movement Mechanics",
                title: "Starting Position & Sequence",
                cards: [
                  { label: "Athletic Stance", text: "Begin in an athletic stance 2 feet from the rope with weight loaded on outside foot, ready to drive." },
                  { label: "Deep Knee Bend", text: "Shuffle toward the rope with a deep knee bend, hinging at the hips with chest upright." },
                  { label: "Powerful Push-Off", text: "Drive through the legs to clear under the rope while maintaining posture." },
                  { label: "Shuffle Recovery", text: "Immediate shuffle recovery back after clearing, then explode forward to the mark." },
                ],
                figures: [
                  { src: `${M}/Drills/Under The Rope Going Forward/utr.png`, caption: "Low stance under the rope" },
                  { src: `${M}/Drills/Under The Rope Going Forward/utr2.png`, caption: "Driving forward after clearing" },
                ],
              },
              {
                eyebrow: "Key Coaching Cues",
                title: "Fundamental Teaching Points",
                listTitle: "Core Teaching Points:",
                list: [
                  "Ensure players are in a set up north-south position when receiving and sending the ball.",
                  "Ensure players impact the ball with strings facing the target.",
                  "Ensure players recover to home base immediately after completing the sequence.",
                ],
              },
            ],
          },
        ],
      },

      /* =====================================================================
         SAYF B
         ===================================================================== */
      {
        id: "sayf-b",
        name: "Sayf Baig",
        firstName: "Sayf",
        lastName: "Baig",
        cover: `${S}/profile/sayf-cover.png`,
        portrait: "assets/media/sayf-portrait.jpg",
        portraitFallback: `${S}/profile/sayf-profile.png`,
        portraitPosition: "50% 25%",
        slideshow: [
          { src: `${S}/profile/slideshow/sayf-forehand.png`, caption: "Standing Forehand" },
          { src: `${S}/profile/slideshow/sayf-forehand-run.png`, caption: "Forehand on the Run" },
          { src: `${S}/profile/slideshow/sayf-backhand.png`, caption: "Backhand Technique" },
          { src: `${S}/profile/slideshow/sayf-backhand-run.png`, caption: "Backhand on the Run" },
          { src: `${S}/profile/slideshow/sayf-serve.png`, caption: "Serve Analysis" },
          { src: `${S}/profile/slideshow/sayf-return.png`, caption: "Return of Serve" },
        ],
        videos: [
          { src: `${S}/drills/Standing Forehand/Standing Forehand.mp4`, title: "Standing Forehand", tag: "Analysis" },
          { src: `${S}/drills/Forehand on the Run/Forehand on the Run.mp4`, title: "Forehand on the Run", tag: "Dynamic" },
          { src: `${S}/drills/Backhand Analysis/Backhand.mp4`, title: "Backhand Analysis", tag: "Technique" },
          { src: `${S}/drills/Backhand on the Run/backhand on the run.mp4`, title: "Backhand on the Run", tag: "Footwork" },
          { src: `${S}/drills/Serve Analysis behind L1/Serve Analysis behind L1.mp4`, title: "Serve Analysis", tag: "Behind View" },
          { src: `${S}/drills/backhand return of serve/backhand return of serve.mp4`, title: "Backhand Return of Serve", tag: "Comprehensive" },
          { src: `${S}/drills/Return of Serve/return of serve.mp4`, title: "Return of Serve Footwork", tag: "Split-Step" },
        ],
        drills: [
          {
            id: "standing-forehand",
            title: "Standing Forehand Analysis",
            category: "Forehand",
            view: "Analysis",
            video: `${S}/drills/Standing Forehand/Standing Forehand.mp4`,
            overview:
              "Sayf – Standing Forehand Analysis: Shoulder Rotation, Elbow Position, Extension, and Follow-Through.",
            sections: [
              {
                eyebrow: "Technical Focus",
                title: "Standing Forehand Analysis",
                cards: [
                  { label: "Shoulder Rotation", text: "Rotate the shoulders more during preparation, creating a fuller turn without overrotating." },
                  { label: "Elbow Position", text: "Keep the elbow away from the body and in a straight line, not pointing too far down or too high." },
                  { label: "Extension", text: "After contact, fully extend the arm and elbow through the ball." },
                  { label: "Follow-Through", text: "Finish the swing with the edge of the racket touching the back of the shoulder." },
                ],
              },
            ],
          },
          {
            id: "forehand-on-the-run",
            title: "Forehand on the Run",
            category: "Footwork",
            view: "Dynamic",
            video: `${S}/drills/Forehand on the Run/Forehand on the Run.mp4`,
            overview:
              "Sayf – Forehand on the Run Analysis: Hip Rotation, Shoulder Turn, Legs, and Mogul Step.",
            sections: [
              {
                eyebrow: "Dynamic Movement",
                title: "Forehand on the Run Analysis",
                cards: [
                  { label: "Hip Rotation", text: "Unlock the hips by turning both feet in the direction of the ball. Run naturally instead of side shuffling with the feet facing the net." },
                  { label: "Shoulder Turn", text: "Improve the left shoulder turn to prepare earlier and create better rotation." },
                  { label: "Legs", text: "Bend the knees and get underneath the ball for better balance, power, and control." },
                  { label: "Mogul Step", text: "Use the mogul step when hitting on the run, pushing through the legs to maintain balance and recover quickly." },
                ],
              },
            ],
          },
          {
            id: "backhand-analysis",
            title: "Backhand Analysis",
            category: "Backhand",
            view: "Technique",
            video: `${S}/drills/Backhand Analysis/Backhand.mp4`,
            overview:
              "Sayf – Backhand Analysis: Grip, Elbow Position, Racket Position, Extension, and Rotation.",
            sections: [
              {
                eyebrow: "Technical Focus",
                title: "Backhand Analysis",
                cards: [
                  { label: "Grip", text: "Keep both palms firmly on the racket handle, not just gripping with the fingers." },
                  { label: "Elbow Position", text: "Keep the elbows slightly away from the body, with the right arm straight and the left elbow slightly bent." },
                  { label: "Racket Position", text: "Keep the edge of the racket pointing up without opening the racket face." },
                  { label: "Extension", text: "Extend both arms more after contact instead of cutting the swing short." },
                  { label: "Rotation", text: "Rotate through the foot and hip during the swing, keeping both feet grounded without jumping." },
                ],
              },
            ],
          },
          {
            id: "backhand-on-the-run",
            title: "Backhand on the Run",
            category: "Footwork",
            view: "Dynamic",
            video: `${S}/drills/Backhand on the Run/backhand on the run.mp4`,
            overview: "Sayf – Backhand on the Run video analysis.",
            sections: [],
          },
          {
            id: "return-of-serve-footwork",
            title: "Return of Serve",
            category: "Footwork",
            view: "Drill",
            video: `${S}/drills/Return of Serve/return of serve.mp4`,
            overview:
              "Sayf – Return of Serve. Focus: Footwork and Split-Step Timing.",
            sections: [
              {
                eyebrow: "Technical Focus",
                title: "Footwork and Split-Step Timing",
                intro: [
                  "Sayf needs to add one extra step before his split step.",
                  "As the opponent begins the service motion, Sayf should be moving his feet forward. When the opponent makes contact with the ball, both feet should be in the air, timing his split step perfectly.",
                  "He should then land balanced and ready to explode toward the ball in either direction.",
                ],
              },
            ],
          },
          {
            id: "serve-analysis-behind-l1",
            title: "Serve Analysis (Behind L1)",
            category: "Serve",
            view: "Behind View",
            video: `${S}/drills/Serve Analysis behind L1/Serve Analysis behind L1.mp4`,
            overview:
              "Sayf – Serve Analysis (Behind L1): Ball Toss, Footwork, Body Position, Jump, Pronation, and Landing.",
            sections: [
              {
                eyebrow: "Technical Focus",
                title: "Serve Analysis (Behind L1)",
                cards: [
                  { label: "Ball Toss", text: "Toss slightly more to the right and into the court. For a right-handed flat serve, aim around 12:30–1 o'clock." },
                  { label: "Footwork", text: "When bringing the feet together, keep the right foot almost in a straight line instead of crossing behind the left." },
                  { label: "Body Position", text: "Stay sideways longer during preparation. Rotate forward as you jump up into the serve, not before." },
                  { label: "Jump", text: "Use the legs more explosively to jump higher and reach a better contact point." },
                  { label: "Pronation", text: "Improve forearm pronation through and immediately after contact." },
                  { label: "Landing", text: "Land on the left foot while hooking the right leg behind for balance." },
                ],
              },
            ],
          },
          {
            id: "backhand-return-of-serve",
            title: "Backhand Return of Serve Analysis",
            category: "Return",
            view: "Comprehensive",
            video: `${S}/drills/backhand return of serve/backhand return of serve.mp4`,
            overview:
              "Technical Focus: Shoulder Turn, Racquet Preparation, Arm Extension & Footwork. Objective: Develop a more compact, controlled, and consistent two-handed backhand return by eliminating excessive wrist movement and improving shoulder rotation, forward extension, and timing.",
            sections: [
              {
                eyebrow: "Section 1",
                title: "Current Technical Issues",
                intro: [
                  "During the video analysis, Sayf demonstrates a tendency to slap at the ball using excessive wrist movement rather than initiating the stroke with his shoulders and upper-body rotation.",
                ],
                listTitle: "Corrections needed:",
                list: [
                  "Excessive wrist action at contact.",
                  "Insufficient shoulder rotation during preparation.",
                  "Too much emphasis on the hands rather than the body.",
                  "Limited extension through the ball.",
                  "Inconsistent racquet-face stability at contact.",
                ],
              },
              {
                eyebrow: "Section 2",
                title: "Shoulder Turn & Racquet Preparation",
                intro: [
                  "The first priority is developing a short, controlled shoulder turn.",
                ],
                listTitle: "Technical corrections:",
                list: [
                  "Initiate preparation by turning the shoulders together.",
                  "Keep both hands connected to the racquet.",
                  "Maintain a compact backswing, approximately half the length of a regular two-handed backhand.",
                  "Keep the strings oriented forward rather than taking the racquet too far behind the body.",
                  "Maintain relaxed but stable wrists throughout preparation.",
                ],
                footnote: "Key coaching cue: “Turn your shoulders first, not your wrists.”",
              },
              {
                eyebrow: "Section 3",
                title: "Footwork – Two Steps Forward & Split Step",
                intro: [
                  "Proper footwork will help Sayf establish better balance, timing, and forward momentum.",
                ],
                listTitle: "Movement sequence:",
                listStyle: "numbered",
                list: [
                  "Take two controlled steps forward into the return position.",
                  "Perform a split step timed with the opponent’s serve contact.",
                  "React quickly toward the incoming ball.",
                  "Use a short shoulder turn while adjusting the feet.",
                  "Establish a balanced position before contact whenever possible.",
                ],
                footnote: "Key coaching cue: “Two steps forward, split, turn, and extend.”",
              },
              {
                eyebrow: "Section 4",
                title: "Contact Point & Arm Extension",
                intro: [
                  "The goal is to replace the wrist-dominant slap with a stable contact point and controlled extension through the ball.",
                ],
                listTitle: "Technical corrections:",
                list: [
                  "Keep both hands working together through contact.",
                  "Maintain a stable racquet face.",
                  "Contact the ball in front of the body.",
                  "Extend both arms forward through the intended direction of the return.",
                  "Avoid excessive wrist flicking or rolling at contact.",
                  "Allow the shoulders and arms to guide the stroke rather than forcing the racquet with the hands.",
                ],
                footnote: "Key coaching cue: “Stable wrists, contact in front, extend both arms.”",
              },
              {
                eyebrow: "Section 5",
                title: "Follow-Through",
                intro: [
                  "After contact, Sayf should allow the racquet to continue naturally in the direction of the shot.",
                ],
                listTitle: "Technical corrections:",
                list: [
                  "Extend through the ball before completing the follow-through.",
                  "Maintain both hands on the racquet.",
                  "Allow the shoulders and torso to rotate naturally.",
                  "Avoid abruptly stopping the racquet or snapping the wrists.",
                  "Recover immediately into a balanced court position.",
                ],
              },
              {
                eyebrow: "Section 6",
                title: "Training Priorities",
                groupStyle: "numbered",
                groups: [
                  {
                    title: "Priority 1 — Shoulder Turn",
                    points: ["Build the habit of initiating every backhand return with a compact shoulder rotation rather than wrist movement."],
                  },
                  {
                    title: "Priority 2 — Compact Preparation",
                    points: ["Reduce the backswing to approximately 50% of a regular backhand to improve timing against faster serves."],
                  },
                  {
                    title: "Priority 3 — Stable Contact & Extension",
                    points: ["Develop a controlled racquet face and forward arm extension, eliminating the slapping motion."],
                  },
                  {
                    title: "Priority 4 — Footwork & Timing",
                    points: ["Establish the two-step-forward approach and properly timed split step before reacting to the serve."],
                  },
                ],
              },
              {
                eyebrow: "Section 7",
                title: "Expected Improvements",
                intro: [
                  "With consistent practice, these corrections should help Sayf develop:",
                ],
                list: [
                  "Greater consistency on backhand returns.",
                  "Better control of racquet-face angle.",
                  "Cleaner and more stable contact.",
                  "Improved timing against faster serves.",
                  "Better directional accuracy and depth.",
                  "More efficient movement and recovery.",
                  "Reduced dependence on wrist movement.",
                ],
              },
              {
                eyebrow: "Summary",
                title: "Final Coaching Summary",
                intro: [
                  "The main correction is to replace the wrist-driven slap with a compact, shoulder-led two-handed backhand return.",
                  "Sayf needs to initiate the movement with his shoulders, keep the racquet preparation short, maintain a stable racquet face, and extend both arms forward through contact before completing the follow-through.",
                  "The focus is not on swinging harder but on creating a more efficient, controlled, and repeatable return technique.",
                ],
                footnote: "Main reminder: TWO STEPS FORWARD → SPLIT STEP → SHORT SHOULDER TURN → CONTACT IN FRONT → EXTEND → FOLLOW THROUGH",
              },
            ],
          },
        ],
      },
    ],
  };
})();

