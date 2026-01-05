# 🎯 MEGA PROMPT TEMPLATES: Master Any Python Topic

> Copy-paste these prompts and replace [TOPIC] with any concept you want to learn.
> Use these with Claude or any AI tutor for structured, deep learning.

---

## 📋 TABLE OF CONTENTS

1. [First Principles Thinking Prompt](#1-first-principles-thinking-prompt)
2. [Feynman Technique Prompt](#2-feynman-technique-prompt)
3. [Active Recall Generator Prompt](#3-active-recall-generator-prompt)
4. [Spaced Repetition Flashcard Prompt](#4-spaced-repetition-flashcard-prompt)
5. [Mental Model Builder Prompt](#5-mental-model-builder-prompt)
6. [Socratic Learning Prompt](#6-socratic-learning-prompt)
7. [Interleaving Practice Prompt](#7-interleaving-practice-prompt)
8. [Elaborative Interrogation Prompt](#8-elaborative-interrogation-prompt)
9. [Deliberate Practice Prompt](#9-deliberate-practice-prompt)
10. [Show Your Work Prompt](#10-show-your-work-prompt)
11. [Retrieval Practice Prompt](#11-retrieval-practice-prompt)
12. [Interview Preparation Prompt](#12-interview-preparation-prompt)
13. [Concept Connection Prompt](#13-concept-connection-prompt)
14. [Debug My Understanding Prompt](#14-debug-my-understanding-prompt)
15. [Code Review Learning Prompt](#15-code-review-learning-prompt)
16. [Project-Based Learning Prompt](#16-project-based-learning-prompt)
17. [Error Pattern Analysis Prompt](#17-error-pattern-analysis-prompt)
18. [Comparison Deep Dive Prompt](#18-comparison-deep-dive-prompt)
19. [One-Week Mastery Plan Prompt](#19-one-week-mastery-plan-prompt)
20. [Quick Revision Prompt](#20-quick-revision-prompt)

---

# 1. FIRST PRINCIPLES THINKING PROMPT

```
I want to understand [TOPIC] using First Principles Thinking.

Please help me by:

1. **IDENTIFY THE FUNDAMENTALS**
   - What are the absolute basic building blocks that make [TOPIC] possible?
   - What primitive Python concepts must I understand first?
   - What problem existed BEFORE [TOPIC] was created?

2. **BREAK IT DOWN**
   - Decompose [TOPIC] into its smallest components
   - For each component, explain what it does at the most basic level
   - Show me the "primitive operations" happening under the hood

3. **BUILD IT BACK UP**
   - Start from the simplest possible example
   - Add complexity step by step
   - At each step, explain WHY we need this addition

4. **SHOW THE CONSTRUCTION**
   - If I had to BUILD [TOPIC] from scratch using only basic Python, 
     what would the code look like?
   - Walk me through creating a simplified version

5. **CONNECT TO FUNDAMENTALS**
   - How does [TOPIC] relate to:
     - Memory management?
     - Python's object model?
     - The interpreter's execution?

Example format I want:
```python
# Step 1: The fundamental building block
[simple code]

# Step 2: Adding the next layer
[slightly more complex code]

# Step 3: This is essentially what [TOPIC] does!
[final code showing the concept]
```

My current understanding of [TOPIC] is: [DESCRIBE WHAT YOU KNOW]

Please be Socratic - ask me questions to check my understanding at each step.
```

---

# 2. FEYNMAN TECHNIQUE PROMPT

```
I want to master [TOPIC] using the Feynman Technique.

Please guide me through this process:

## PHASE 1: SIMPLE EXPLANATION
Explain [TOPIC] as if I'm a 10-year-old who has never programmed.
- Use everyday analogies (kitchen, school, games, etc.)
- No jargon - if you must use a technical term, define it simply
- Use a story or scenario to make it memorable

## PHASE 2: ANALOGY CREATION
Create 3 different analogies for [TOPIC]:
1. A physical/real-world analogy
2. A relationship/social analogy  
3. A visual/spatial analogy

For each analogy, explain:
- How the analogy maps to the code concept
- Where the analogy breaks down (limitations)

## PHASE 3: GAP IDENTIFICATION
Based on the simple explanation, identify:
- What important details did we oversimplify?
- What edge cases does the simple explanation miss?
- What would confuse someone who ONLY knew the simple version?

## PHASE 4: LAYERED COMPLEXITY
Now add layers of complexity:
- Layer 1: Basic usage (beginner)
- Layer 2: Common patterns (intermediate)
- Layer 3: Advanced usage (advanced)
- Layer 4: Internal implementation (expert)

## PHASE 5: TEACHING TEST
Give me a scenario where I have to explain [TOPIC] to someone else.
Then evaluate my explanation and point out gaps.

Format each section clearly with examples and code snippets.
```

---

# 3. ACTIVE RECALL GENERATOR PROMPT

```
Generate a complete Active Recall study session for [TOPIC].

Create the following recall exercises:

## 1. BLANK PAGE TEST (5 questions)
Questions I should answer from memory about [TOPIC]:
- Q1: [Conceptual question]
- Q2: [Syntax question]
- Q3: [Use case question]
- Q4: [Comparison question]
- Q5: [Edge case question]

## 2. CODE COMPLETION CHALLENGES (3 exercises)
Provide code with strategic blanks to fill in:
```python
# Exercise 1: Basic
[code with _____ blanks]

# Exercise 2: Intermediate  
[code with _____ blanks]

# Exercise 3: Advanced
[code with _____ blanks]
```

## 3. OUTPUT PREDICTION (5 snippets)
Code snippets where I predict output BEFORE running:
```python
# Snippet 1
[code]
# My prediction: _______

# Snippet 2 (trickier)
[code]
# My prediction: _______
```
(Continue for 5 snippets, increasing difficulty)

## 4. ERROR PREDICTION (3 scenarios)
"What error will this code produce and why?"
```python
# Scenario 1
[buggy code]
# Error type: _______
# Reason: _______
```

## 5. REVERSE ENGINEERING (2 challenges)
"Write code that produces this output:"
- Challenge 1: [Show expected output, I write the code]
- Challenge 2: [Show expected output, I write the code]

## 6. EXPLAIN THE WHY (3 questions)
- Why does [specific behavior] happen in [TOPIC]?
- Why is [TOPIC] designed this way instead of [alternative]?
- Why would you choose [TOPIC] over [alternative approach]?

After I attempt these, provide detailed answers with explanations.
```

---

# 4. SPACED REPETITION FLASHCARD PROMPT

```
Create a complete Anki/Flashcard deck for [TOPIC].

Generate 20 flashcards in these categories:

## CATEGORY 1: CONCEPT → CODE (5 cards)
Format:
- Front: "How do you [action] using [TOPIC]?"
- Back: [Code snippet + brief explanation]

## CATEGORY 2: CODE → OUTPUT (5 cards)
Format:
- Front: [Code snippet]
- Back: [Output + explanation of why]

## CATEGORY 3: ERROR → FIX (3 cards)
Format:
- Front: "[Error message]" - What caused this?
- Back: [Cause + Fix + Prevention tip]

## CATEGORY 4: COMPARISON (3 cards)
Format:
- Front: "What's the difference between [A] and [B]?"
- Back: [Clear comparison with examples]

## CATEGORY 5: WHEN TO USE (2 cards)
Format:
- Front: "When should you use [TOPIC] instead of [alternative]?"
- Back: [Scenario + reasoning]

## CATEGORY 6: GOTCHAS (2 cards)
Format:
- Front: "What's a common mistake with [TOPIC]?"
- Back: [Mistake + correct approach + example]

For each card, also provide:
- Difficulty level (1-5)
- Related cards to review together
- Suggested review interval

Format the output so I can easily copy into Anki or a flashcard app.
```

---

# 5. MENTAL MODEL BUILDER PROMPT

```
Help me build a strong mental model for [TOPIC].

## 1. VISUAL REPRESENTATION
Create ASCII art or describe a visual diagram that shows:
- How [TOPIC] works internally
- The relationship between components
- The flow of data/execution

Example format:
```
    ┌─────────┐
    │ Input   │
    └────┬────┘
         │
         ▼
    ┌─────────┐
    │ Process │
    └────┬────┘
         │
         ▼
    ┌─────────┐
    │ Output  │
    └─────────┘
```

## 2. MEMORY MODEL
Show me what happens in memory when using [TOPIC]:
- Before execution
- During execution (step by step)
- After execution

Use a format like:
```
Memory State:
┌──────────────┬───────────────┐
│ Variable     │ Points to     │
├──────────────┼───────────────┤
│ x            │ Object at 0x1 │
│ y            │ Object at 0x2 │
└──────────────┴───────────────┘
```

## 3. STATE TRANSITIONS
Show how state changes with [TOPIC]:
- Initial state → Action → New state
- Provide 3 different scenarios

## 4. DECISION TREE
When should I use [TOPIC]?
Create a decision flowchart:
```
Need to [action]?
    │
    ├── Yes → Is [condition]?
    │         ├── Yes → Use [TOPIC]
    │         └── No → Use [alternative]
    │
    └── No → Consider [other approach]
```

## 5. COMMON PATTERNS
Show 3-5 common usage patterns as "mental shortcuts":
- Pattern name: [Name]
- When to use: [Scenario]
- Template code: [Code]

## 6. ANTI-PATTERNS
Show 3 things that LOOK right but are WRONG:
- What it looks like
- Why it's wrong
- What to do instead

## 7. MENTAL CHECKLIST
Give me a checklist to run through when using [TOPIC]:
□ Did I consider [X]?
□ Did I handle [Y]?
□ Did I check for [Z]?
```

---

# 6. SOCRATIC LEARNING PROMPT

```
Teach me [TOPIC] using the Socratic method.

Rules for this session:
1. Don't tell me answers directly - guide me with questions
2. Start from what I might already know
3. Build understanding through my own reasoning
4. Celebrate when I figure something out
5. Redirect gently when I'm wrong

## START THE DIALOGUE

Begin with a simple question that connects [TOPIC] to something familiar.

After each of my responses:
- Acknowledge what I got right
- Ask a follow-up question that goes deeper
- If I'm stuck, give a small hint (not the answer)
- If I'm wrong, ask a question that reveals the flaw in my reasoning

## QUESTION PROGRESSION
Guide me through this sequence:
1. **Foundation**: What do I already know that relates to this?
2. **Observation**: What do I notice about [example code]?
3. **Pattern**: What pattern am I seeing?
4. **Hypothesis**: Why do I think this works this way?
5. **Test**: What would happen if [variation]?
6. **Synthesis**: How would I explain this to someone else?
7. **Application**: Where else could I use this?

## SOCRATIC CHECKPOINTS
At key moments, ask me to:
- Summarize what I've learned so far
- Explain my current mental model
- Predict what comes next

## MY CURRENT LEVEL
I would rate my understanding of [TOPIC] as: [BEGINNER/INTERMEDIATE/ADVANCED]

Things I think I know about [TOPIC]:
- [List what you know]

Things I'm confused about:
- [List confusions]

Please begin the Socratic dialogue!
```

---

# 7. INTERLEAVING PRACTICE PROMPT

```
Create an interleaved practice session that mixes [TOPIC] with related concepts.

## SESSION STRUCTURE (60 minutes)

### WARM-UP (10 min)
3 quick recall questions mixing:
- [TOPIC]
- [Related concept 1 from previous learning]
- [Related concept 2 from previous learning]

### MAIN PRACTICE (40 min)

**Round 1: Single Concept Problems**
- Problem 1: Pure [TOPIC] problem (Easy)
- Problem 2: Pure [RELATED CONCEPT] problem (Easy)
- Problem 3: Pure [ANOTHER CONCEPT] problem (Easy)

**Round 2: Two-Concept Integration**
- Problem 4: Combines [TOPIC] + [RELATED CONCEPT] (Medium)
- Problem 5: Combines [TOPIC] + [ANOTHER CONCEPT] (Medium)

**Round 3: Multi-Concept Challenge**
- Problem 6: Requires [TOPIC] + [CONCEPT A] + [CONCEPT B] (Hard)

**Round 4: Random Mix**
- Problem 7: Could be any concept (Surprise!)
- Problem 8: Could be any concept (Surprise!)

### COOL-DOWN (10 min)
- Identify which concept each problem tested
- Note which combinations were hardest
- Create 2 new problems mixing concepts

## FORMAT FOR EACH PROBLEM

```python
# Problem N: [Difficulty]
# Concepts tested: [List]
# 
# Task: [Description]
#
# Input: [Example input]
# Expected Output: [Example output]
#
# Hints (reveal if stuck):
# Hint 1: [Mild hint]
# Hint 2: [Stronger hint]
#
# Solution (reveal after attempting):
# [Solution code with explanation]
```

## MY RECENT TOPICS
Topics I've studied recently that should be interleaved:
1. [Topic 1]
2. [Topic 2]  
3. [Topic 3]

Please create this interleaved session!
```

---

# 8. ELABORATIVE INTERROGATION PROMPT

```
Help me deeply understand [TOPIC] through Elaborative Interrogation.

For [TOPIC], answer these deep questions:

## THE SEVEN DEEP WHYS

### 1. WHY does [TOPIC] exist?
- What problem was Python trying to solve?
- What was life like BEFORE this feature?
- What alternative approaches existed?

### 2. WHY is it designed this way?
- What design decisions were made?
- What trade-offs were considered?
- Why this syntax/structure instead of alternatives?

### 3. WHY does it behave the way it does?
- What happens under the hood?
- What Python internals make this work?
- What would break if it worked differently?

### 4. WHY would I choose this over alternatives?
- When is [TOPIC] the best choice?
- When is it NOT the best choice?
- What are the performance implications?

### 5. WHY do common mistakes happen?
- What misconceptions lead to errors?
- What edge cases catch people?
- What's the "gotcha" that surprises beginners?

### 6. WHY does this matter for real code?
- How is this used in production?
- What famous libraries use this and why?
- What patterns depend on this?

### 7. WHY should I care about the internals?
- How does knowing the "why" help me code better?
- What debugging does this knowledge enable?
- What advanced techniques does this unlock?

## CONNECT THE DOTS

After answering the WHYs, show me:
- How [TOPIC] connects to 3 other Python concepts
- A "concept map" showing relationships
- One insight that changes how I should think about [TOPIC]

## ELABORATION EXERCISE

Give me a "fact" about [TOPIC] and have me elaborate on WHY it's true:

Fact: "[Statement about TOPIC]"
My elaboration: [I explain WHY]
Your feedback: [Correct/expand my reasoning]
```

---

# 9. DELIBERATE PRACTICE PROMPT

```
Design a Deliberate Practice session for [TOPIC].

## SKILL ASSESSMENT

First, help me identify my current level:

### Diagnostic Questions (answer honestly)
1. Can I explain [TOPIC] without notes? [Y/N]
2. Can I use [TOPIC] without looking up syntax? [Y/N]
3. Can I identify when to use [TOPIC] vs alternatives? [Y/N]
4. Can I debug [TOPIC]-related errors quickly? [Y/N]
5. Can I teach [TOPIC] to someone else? [Y/N]

Based on my answers: [DESCRIBE YOUR LEVEL]

## ZONE OF PROXIMAL DEVELOPMENT

Create exercises that are JUST beyond my current ability:

### Level 1: Foundational (if I'm a beginner)
- Exercise 1.1: [Basic task]
- Exercise 1.2: [Basic task with small twist]
- Exercise 1.3: [Basic task with edge case]

### Level 2: Proficient (if I'm intermediate)
- Exercise 2.1: [Standard application]
- Exercise 2.2: [Combining with another concept]
- Exercise 2.3: [Optimization challenge]

### Level 3: Advanced (if I'm experienced)
- Exercise 3.1: [Complex real-world scenario]
- Exercise 3.2: [Performance-critical implementation]
- Exercise 3.3: [Design your own [TOPIC]-based solution]

## IMMEDIATE FEEDBACK

For each exercise, provide:
1. Success criteria (how do I know I did it right?)
2. Common mistakes to watch for
3. Step-by-step solution I can compare against
4. Reflection questions:
   - What was hard about this?
   - What did I learn?
   - What would I do differently?

## STRUGGLE POINTS

Identify 3 specific sub-skills within [TOPIC] that are typically challenging:
1. [Sub-skill 1] - Practice drill: [Specific exercise]
2. [Sub-skill 2] - Practice drill: [Specific exercise]
3. [Sub-skill 3] - Practice drill: [Specific exercise]

## PROGRESS TRACKING

Create a rubric for self-assessment:
| Skill | Novice | Developing | Proficient | Expert |
|-------|--------|------------|------------|--------|
| [Skill 1] | [criteria] | [criteria] | [criteria] | [criteria] |
| [Skill 2] | [criteria] | [criteria] | [criteria] | [criteria] |

## MY FOCUS AREA
The specific aspect of [TOPIC] I want to improve: [DESCRIBE]

Please create this deliberate practice session!
```

---

# 10. SHOW YOUR WORK PROMPT

```
Guide me through the "Show Your Work" method for [TOPIC].

## STEP 1: MINIMAL WORKING EXAMPLE
Create the absolute simplest code that demonstrates [TOPIC]:
```python
# The simplest possible example of [TOPIC]
[code - no more than 5 lines if possible]
```

## STEP 2: LINE-BY-LINE EXPLANATION
For the code above, explain EVERY line:
```python
# Line 1: [What it does] [WHY it's needed]
# Line 2: [What it does] [WHY it's needed]
# ... continue for all lines
```

## STEP 3: PREDICT OUTPUT
Show me the code and ask me to predict:
```python
[code]
# Before running, I predict the output will be: _______
# My reasoning: _______
```

Then reveal the actual output and explain any surprises.

## STEP 4: MODIFY & PREDICT
Make ONE small change and have me predict again:
```python
# Original:
[original code]

# Modified (one change):
[modified code]

# What will change in the output? _______
# Why? _______
```

Repeat this 3 times with different modifications.

## STEP 5: IDENTIFY TRAPS
List the top 5 common mistakes/traps with [TOPIC]:

| Trap | What it looks like | Why it's wrong | Correct approach |
|------|-------------------|----------------|------------------|
| 1 | [code] | [reason] | [fix] |
| 2 | [code] | [reason] | [fix] |
| ... | ... | ... | ... |

## STEP 6: SUMMARIZE CORE CONCEPT
Help me create a one-sentence summary:
"[TOPIC] is _____________ that allows you to _____________ by _____________."

## STEP 7: REFLECTIVE DEEPENING

### For a 5-year-old:
"[TOPIC] is like when you ____________..."

### Metaphor/Analogy:
"Think of [TOPIC] as a ____________ that ____________..."

### Real-world parallel:
"In real life, this is similar to how ____________..."

## DOCUMENTATION TEMPLATE
Fill this out as I learn:

```
TOPIC: [TOPIC]
DATE LEARNED: _______

MINIMAL EXAMPLE:
[code]

ONE-SENTENCE SUMMARY:
_______

KEY INSIGHT:
_______

COMMON TRAPS TO AVOID:
1. _______
2. _______

MY ANALOGY:
_______

QUESTIONS I STILL HAVE:
1. _______
```
```

---

# 11. RETRIEVAL PRACTICE PROMPT

```
Create a comprehensive Retrieval Practice session for [TOPIC].

## SECTION 1: FREE RECALL (No hints)

"Write everything you know about [TOPIC] in 3 minutes. 
Don't look anything up. Just dump your brain."

After I write my response, tell me:
- What I got right
- What I missed
- What I got wrong
- Percentage score estimate

## SECTION 2: CUED RECALL

Fill in the blanks (keywords removed):
```python
# Passage about [TOPIC] with _____ blanks
# Each blank is a key term or concept

[Paragraph with 5-7 strategic blanks]
```

## SECTION 3: CODE RECALL

### 3.1 Write from memory
"Write the code to [common task with TOPIC] without any references."

### 3.2 Fix from memory
```python
# This code has 3 bugs related to [TOPIC]. Find and fix them.
[buggy code]
```

### 3.3 Complete from memory
```python
# Complete this function using [TOPIC]
def function_name(params):
    # Your code here using [TOPIC]
    _______
    _______
    return _______
```

## SECTION 4: RECOGNITION VS RECALL

### Multiple Choice (Recognition)
Which of these correctly demonstrates [TOPIC]?
A) [code option]
B) [code option]
C) [code option]
D) [code option]

### Now Write It (Recall)
Now write your own example of [TOPIC] (harder than recognizing!)

## SECTION 5: APPLICATION RECALL

"You're building [scenario]. How would you use [TOPIC]?"

Think through:
1. Why [TOPIC] is appropriate here
2. How you would implement it
3. What edge cases to consider

## SECTION 6: TEACHING RECALL

"Explain [TOPIC] to someone who knows Python basics but hasn't learned this yet."

- Start with why they need it
- Show the simplest example
- Explain the key rules
- Warn about common mistakes

## SCORING RUBRIC

After each section, rate yourself:
- 5: Perfect recall, no hesitation
- 4: Mostly correct, minor gaps
- 3: Got the main idea, some errors
- 2: Struggled, needed to think hard
- 1: Could barely remember

Overall score: ___/30

Sections to review more: _______
```

---

# 12. INTERVIEW PREPARATION PROMPT

```
Prepare me to discuss [TOPIC] in a technical interview.

## PART 1: COMMON INTERVIEW QUESTIONS

Generate 10 interview questions about [TOPIC], ranging from basic to advanced:

### Basic (Screening level)
1. [Question]
2. [Question]
3. [Question]

### Intermediate (Phone interview level)  
4. [Question]
5. [Question]
6. [Question]

### Advanced (Onsite level)
7. [Question]
8. [Question]

### Expert (Senior/Staff level)
9. [Question]
10. [Question]

## PART 2: MODEL ANSWERS

For each question, provide:
- ✅ Strong answer (what impresses interviewers)
- ⚠️ Acceptable answer (what passes)
- ❌ Red flag answer (what raises concerns)
- 💡 Follow-up questions interviewer might ask

## PART 3: CODING CHALLENGES

### Challenge 1: Basic Implementation
```
Problem: [Description]
Input: [Example]
Output: [Example]
Time limit: 10 minutes

REACTO Framework:
R - Repeat: _______
E - Examples: _______
A - Approach: _______
C - Code: _______
T - Test: _______
O - Optimize: _______
```

### Challenge 2: [TOPIC] in Context
```
Problem: [Real-world scenario involving TOPIC]
Constraints: [Time/space requirements]
Time limit: 20 minutes
```

### Challenge 3: Edge Cases & Optimization
```
Problem: [Tricky problem with gotchas]
Follow-ups: 
- What if input is very large?
- What if memory is limited?
- What if this runs in a multi-threaded environment?
```

## PART 4: BEHAVIORAL QUESTIONS

"Tell me about a time you used [TOPIC] to solve a problem."
- STAR format template
- What they're really asking
- Red flags to avoid

## PART 5: WHITEBOARD SIMULATION

"Walk me through how [TOPIC] works internally."
- What to draw on the whiteboard
- Key points to hit
- How to handle "I don't know"

## PART 6: QUICK REFERENCE CARD

Create a one-page cheat sheet I can review 30 minutes before the interview:
- Key syntax
- Time complexities
- Common patterns
- Gotchas to mention
- Impressive insights to drop

## MY INTERVIEW CONTEXT
- Company type: [FAANG/Startup/etc.]
- Role level: [Junior/Mid/Senior]
- Interview format: [Phone/Onsite/Take-home]

Please customize the preparation accordingly!
```

---

# 13. CONCEPT CONNECTION PROMPT

```
Help me connect [TOPIC] to the broader Python ecosystem.

## CONCEPT MAP

Create a visual concept map showing how [TOPIC] relates to:

```
                    ┌─────────────┐
                    │   [TOPIC]   │
                    └──────┬──────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
         ▼                 ▼                 ▼
   ┌──────────┐     ┌──────────┐     ┌──────────┐
   │ Concept A │     │ Concept B │     │ Concept C │
   └──────────┘     └──────────┘     └──────────┘
```

## PREREQUISITE CHAIN

What concepts must I understand BEFORE [TOPIC]?
```
[Fundamental 1] → [Building Block] → [Prerequisite] → [TOPIC]
```

## BUILDS TOWARD

What advanced concepts does [TOPIC] enable?
```
[TOPIC] → [Intermediate Use] → [Advanced Application] → [Expert Pattern]
```

## RELATED CONCEPTS COMPARISON

| Aspect | [TOPIC] | [Related 1] | [Related 2] |
|--------|---------|-------------|-------------|
| Purpose | | | |
| Syntax | | | |
| Performance | | | |
| Use case | | | |

## PATTERN RECOGNITION

Show me how [TOPIC] appears in:
1. **Standard Library**: Which modules use this?
2. **Popular Frameworks**: Django, Flask, FastAPI usage
3. **Data Science**: Pandas, NumPy connections
4. **Design Patterns**: Which patterns leverage this?

## ANALOGY BRIDGES

Connect [TOPIC] to concepts in:
- Other programming languages (Java, JavaScript, etc.)
- Mathematics
- Real-world systems
- Other Python concepts I already know

## SYNTHESIS EXERCISE

Create a small project that combines [TOPIC] with:
- [Concept I learned last week]
- [Concept I'm comfortable with]
- [Concept I want to learn next]

## MY KNOWLEDGE CONTEXT
Concepts I already understand well:
- [List them]

Concepts I'm currently learning:
- [List them]

Please show me the connections!
```

---

# 14. DEBUG MY UNDERSTANDING PROMPT

```
Help me debug my understanding of [TOPIC].

## MY CURRENT UNDERSTANDING

Here's what I THINK I know about [TOPIC]:
```
[Write your current understanding in your own words]
```

## MISCONCEPTION CHECK

Based on my explanation above:
1. What did I get RIGHT? (Validate correct understanding)
2. What did I get WRONG? (Identify misconceptions)
3. What did I MISS? (Gaps in knowledge)
4. What did I OVERSIMPLIFY? (Nuances I'm missing)

## BELIEF TESTING

I believe these statements are true. Please test each:

1. "[Statement I believe about TOPIC]" - TRUE/FALSE? Why?
2. "[Another statement]" - TRUE/FALSE? Why?
3. "[Another statement]" - TRUE/FALSE? Why?

## CODE PREDICTION DEBUG

I think this code will output [X]:
```python
[code I'm unsure about]
```

Am I right? If not, where did my reasoning go wrong?

## EDGE CASE BLINDSPOTS

What edge cases with [TOPIC] would surprise me?
- Edge case 1: [What happens when...]
- Edge case 2: [What happens when...]
- Edge case 3: [What happens when...]

## MENTAL MODEL CORRECTION

If my mental model of [TOPIC] is flawed, show me:
1. My broken mental model (how I'm thinking about it)
2. The correct mental model (how I should think about it)
3. Why the broken model leads to errors

## SOCRATIC DEBUGGING

Ask me 5 questions that expose gaps in my understanding:
1. [Question that reveals if I understand X]
2. [Question that reveals if I understand Y]
3. [Question that reveals if I understand Z]
4. [Question about edge cases]
5. [Question about internal mechanism]

I'll answer, then you tell me what my answers reveal about my understanding.

## CALIBRATION

After this session, rate my actual understanding:
- □ Thought I knew it, actually do (correctly calibrated)
- □ Thought I knew it, actually don't (overconfident)
- □ Thought I didn't know it, actually do (underconfident)
- □ Thought I didn't know it, actually don't (correctly calibrated)
```

---

# 15. CODE REVIEW LEARNING PROMPT

```
Use code review to teach me about [TOPIC].

## REVIEW MY CODE

Here's my code using [TOPIC]:
```python
[paste your code here]
```

Please review it considering:

### CORRECTNESS
- Does it work correctly?
- Are there bugs?
- Does it handle edge cases?

### PYTHONIC STYLE
- Is it idiomatic Python?
- Does it follow PEP 8?
- Could it be more "Pythonic"?

### [TOPIC] BEST PRACTICES
- Am I using [TOPIC] correctly?
- Am I using [TOPIC] optimally?
- Are there [TOPIC]-specific patterns I'm missing?

### PERFORMANCE
- Time complexity analysis
- Space complexity analysis
- Potential optimizations

### READABILITY
- Is it clear what the code does?
- Are names meaningful?
- Would comments help?

## FEEDBACK FORMAT

For each issue found, provide:
```
ISSUE: [Description]
LOCATION: Line [X]
SEVERITY: [Critical/Major/Minor/Style]
CURRENT CODE: [what I wrote]
SUGGESTED CODE: [what it should be]
LEARNING: [What this teaches about TOPIC]
```

## COMPARATIVE VERSIONS

Show me:
1. **My version** (as-is)
2. **Improved version** (fixes issues)
3. **Expert version** (how a senior dev would write it)
4. **Over-engineered version** (when NOT to do this)

## DISCUSSION QUESTIONS

After the review, discuss:
- What was the biggest issue and why?
- What did I do well?
- What pattern should I remember for next time?

## FOLLOW-UP EXERCISE

Give me a similar problem to apply what I learned from this review.
```

---

# 16. PROJECT-BASED LEARNING PROMPT

```
Design a project that teaches me [TOPIC] through building.

## PROJECT SPECIFICATION

### Project Name: [Catchy name]

### Learning Goals:
By completing this project, I will understand:
- [Specific aspect of TOPIC]
- [Another aspect of TOPIC]
- [How TOPIC integrates with other concepts]

### Project Description:
[2-3 sentence description of what I'm building]

### Why This Project:
- Real-world relevance: [How this applies to actual development]
- [TOPIC] coverage: [Which aspects of TOPIC this exercises]
- Engagement factor: [Why this is interesting to build]

## MILESTONE BREAKDOWN

### Milestone 1: Foundation (Day 1)
**Goal**: [What I'll accomplish]
**[TOPIC] concepts used**: [Specific concepts]
**Deliverable**: [What I'll have at the end]
**Code skeleton**:
```python
# Starter code for Milestone 1
```

### Milestone 2: Core Feature (Day 2-3)
**Goal**: [What I'll accomplish]
**[TOPIC] concepts used**: [Deeper concepts]
**Deliverable**: [What I'll have at the end]
**Hints if stuck**: [Guidance without giving answer]

### Milestone 3: Enhancement (Day 4-5)
**Goal**: [What I'll accomplish]
**[TOPIC] concepts used**: [Advanced concepts]
**Deliverable**: [What I'll have at the end]

### Milestone 4: Polish & Edge Cases (Day 6-7)
**Goal**: [What I'll accomplish]
**Focus**: Error handling, edge cases, optimization

## STRETCH GOALS
If I want to go further:
- [ ] [Advanced feature 1]
- [ ] [Advanced feature 2]
- [ ] [Integration with another concept]

## LEARNING CHECKPOINTS

At each milestone, I should be able to answer:
- Milestone 1 checkpoint: [Question to verify understanding]
- Milestone 2 checkpoint: [Question to verify understanding]
- Milestone 3 checkpoint: [Question to verify understanding]

## RESOURCES ALLOWED
- ✅ [What I can reference]
- ❌ [What I shouldn't just copy]

## MY CONTEXT
- Time available: [hours per day]
- Current skill level: [beginner/intermediate/advanced]
- Interests: [what makes projects engaging for me]

Please design this learning project!
```

---

# 17. ERROR PATTERN ANALYSIS PROMPT

```
Teach me [TOPIC] through common errors and how to fix them.

## ERROR CATALOG

### Error Type 1: [Name]
**The Error**:
```python
# Code that causes the error
[buggy code]
```

**Error Message**:
```
[Exact error message]
```

**Why It Happens**:
[Explanation of the underlying cause]

**The Fix**:
```python
# Corrected code
[fixed code]
```

**Prevention Strategy**:
[How to avoid this in the future]

**Mental Model Update**:
[What this teaches about how TOPIC works]

---

### Error Type 2: [Name]
[Same format]

---

### Error Type 3: [Name]
[Same format]

---

[Continue for 5-7 common errors]

## ERROR DIAGNOSIS PRACTICE

### Scenario 1
```python
# This code doesn't work as expected
[code with subtle bug]
```
- What's wrong?
- How would you fix it?
- Why does this mistake happen?

### Scenario 2
[Same format]

### Scenario 3
[Same format]

## ERROR PREVENTION CHECKLIST

Before using [TOPIC], always check:
□ [Check 1]
□ [Check 2]
□ [Check 3]
□ [Check 4]
□ [Check 5]

## DEBUGGING STRATEGIES

When you encounter an error with [TOPIC]:

**Step 1**: [First thing to check]
**Step 2**: [Second thing to check]
**Step 3**: [Third thing to check]

**Useful debugging techniques**:
```python
# How to debug [TOPIC] issues
[debugging code snippets]
```

## ERROR FREQUENCY MAP

| Error | Frequency | Severity | Usually Caused By |
|-------|-----------|----------|-------------------|
| [Error 1] | Common | High | [Cause] |
| [Error 2] | Common | Medium | [Cause] |
| [Error 3] | Rare | High | [Cause] |

## MY ERROR HISTORY
Errors I've personally encountered with [TOPIC]:
- [Describe an error you've seen]

Help me understand why it happened and how to prevent it!
```

---

# 18. COMPARISON DEEP DIVE PROMPT

```
Help me deeply understand [TOPIC A] vs [TOPIC B].

## SURFACE COMPARISON

| Aspect | [TOPIC A] | [TOPIC B] |
|--------|-----------|-----------|
| Purpose | | |
| Syntax | | |
| Mutability | | |
| Performance | | |
| Memory usage | | |
| Common use cases | | |

## CODE COMPARISON

Show the same task done with both:

```python
# Task: [Description]

# Using [TOPIC A]:
[code]

# Using [TOPIC B]:
[code]
```

## WHEN TO USE WHICH

### Use [TOPIC A] when:
- [Scenario 1]
- [Scenario 2]
- [Scenario 3]

### Use [TOPIC B] when:
- [Scenario 1]
- [Scenario 2]
- [Scenario 3]

### It doesn't matter when:
- [Scenario where both work equally well]

## DEEP DIFFERENCES

### Internal Implementation
- [TOPIC A] works by: [explanation]
- [TOPIC B] works by: [explanation]

### Performance Characteristics
```
Operation        | [TOPIC A]  | [TOPIC B]
----------------|------------|----------
[Operation 1]   | O(?)       | O(?)
[Operation 2]   | O(?)       | O(?)
[Operation 3]   | O(?)       | O(?)
```

### Memory Behavior
[Explain memory differences with examples]

## COMMON CONFUSION

### People often think: [Misconception]
### Reality: [Truth]

### People often confuse: [Mix-up]
### The key difference is: [Clarification]

## CONVERSION BETWEEN THEM

```python
# Converting [TOPIC A] to [TOPIC B]:
[code]

# Converting [TOPIC B] to [TOPIC A]:
[code]

# When conversion loses information:
[explanation]
```

## PRACTICE: CHOOSE THE RIGHT ONE

For each scenario, which should I use and why?

1. [Scenario 1] → [A or B]? Because: _______
2. [Scenario 2] → [A or B]? Because: _______
3. [Scenario 3] → [A or B]? Because: _______
4. [Scenario 4] → [A or B]? Because: _______
5. [Scenario 5] → [A or B]? Because: _______

## HISTORICAL CONTEXT

Why do both exist? What's the history?
- [TOPIC A] was created because: [reason]
- [TOPIC B] was created because: [reason]

## MY CONFUSION

The specific thing I find confusing about [TOPIC A] vs [TOPIC B]:
[Describe your confusion]

Please clarify this!
```

---

# 19. ONE-WEEK MASTERY PLAN PROMPT

```
Create a one-week intensive plan to master [TOPIC].

## WEEK OVERVIEW

**Goal**: Go from [current level] to [target level] in [TOPIC]

**Daily time commitment**: [X] hours

**By end of week, I will be able to**:
- [ ] [Concrete skill 1]
- [ ] [Concrete skill 2]
- [ ] [Concrete skill 3]
- [ ] [Concrete skill 4]

---

## DAY 1: FOUNDATIONS
**Theme**: Understanding the basics

**Morning (Theory):**
- Read/Watch: [Specific resource]
- Focus on: [Specific concepts]
- Take notes on: [Key points]

**Afternoon (Practice):**
- Exercise 1: [Description]
- Exercise 2: [Description]
- Mini-project: [Description]

**Evening (Review):**
- Feynman test: Explain today's learning
- Create 5 flashcards
- Note questions for tomorrow

**Checkpoint**: Can I [simple test]?

---

## DAY 2: CORE MECHANICS
**Theme**: How [TOPIC] really works

**Morning (Theory):**
[Structure continues...]

**Afternoon (Practice):**
[Exercises...]

**Evening (Review):**
[Review activities...]

**Checkpoint**: Can I [test]?

---

## DAY 3: COMMON PATTERNS
**Theme**: Real-world usage patterns

[Same structure...]

---

## DAY 4: EDGE CASES & GOTCHAS
**Theme**: What can go wrong

[Same structure...]

---

## DAY 5: INTEGRATION
**Theme**: Combining with other concepts

[Same structure...]

---

## DAY 6: ADVANCED TECHNIQUES
**Theme**: Going deeper

[Same structure...]

---

## DAY 7: MASTERY TEST
**Theme**: Proving your knowledge

**Morning:**
- Comprehensive self-test (no references)
- Code challenge under time pressure
- Explain [TOPIC] teaching-style

**Afternoon:**
- Build mini-project from scratch
- Review all flashcards
- Identify remaining gaps

**Evening:**
- Fill gaps identified
- Plan continued practice
- Celebrate progress! 🎉

---

## RESOURCES FOR THE WEEK

**Must-read:**
- [Resource 1]
- [Resource 2]

**Must-practice:**
- [Practice site/problems]

**Must-build:**
- [Mini-project ideas]

## ACCOUNTABILITY

Daily check-in questions:
1. What did I learn today?
2. What confused me?
3. What will I do differently tomorrow?

## MY CONTEXT
- Current level with [TOPIC]: [Beginner/Intermediate/Advanced]
- Available hours per day: [X]
- Best learning style: [Reading/Videos/Coding/Mixed]
- Related topics I know: [List]

Please create my personalized week plan!
```

---

# 20. QUICK REVISION PROMPT

```
I need a quick revision session for [TOPIC]. I have [X] minutes.

## RAPID-FIRE ESSENTIALS

### 30-Second Summary
[TOPIC] in one breath: _______________

### Key Syntax (Copy-Paste Ready)
```python
# Essential [TOPIC] syntax
[most common patterns]
```

### The "Always Remember" Rules
1. _______________
2. _______________
3. _______________

### The "Never Do" Rules
1. ❌ _______________
2. ❌ _______________
3. ❌ _______________

## 5-MINUTE DRILL

### Quick Quiz (30 seconds each)
1. [Question] → Answer: ___
2. [Question] → Answer: ___
3. [Question] → Answer: ___
4. [Question] → Answer: ___
5. [Question] → Answer: ___

### Speed Coding (2 minutes)
Write [common task with TOPIC] as fast as you can:
```python
# GO!

```

### Error Spot (1 minute)
Find the bug:
```python
[buggy code]
```

## LAST-MINUTE REMINDERS

### If you see [X], think [Y]
- See [pattern] → Use [approach]
- See [pattern] → Use [approach]
- See [pattern] → Use [approach]

### Common Interview Angle
The interviewer usually asks about: [key point]
The impressive thing to mention: [insight]

### Complexity Cheat Sheet
| Operation | Time | Space |
|-----------|------|-------|
| [Op 1] | O(?) | O(?) |
| [Op 2] | O(?) | O(?) |

## POST-REVISION CONFIDENCE CHECK

After this revision, I feel:
- [ ] Ready (can explain and code confidently)
- [ ] Mostly ready (might need a hint)
- [ ] Need more review (should revisit)

## MY TIME CONSTRAINT
I have exactly [X] minutes. Please prioritize accordingly!
```

---

# 🎯 MASTER PROMPT: LEARN ANY TOPIC

```
I want to comprehensively learn [TOPIC] using multiple techniques.

Please create a learning session that includes:

1. **FIRST PRINCIPLES** (5 min)
   - Break down to fundamentals
   - Build back up

2. **FEYNMAN EXPLANATION** (5 min)
   - Simple analogy
   - For a 10-year-old

3. **MENTAL MODEL** (5 min)
   - Visual representation
   - Memory diagram

4. **ACTIVE RECALL TEST** (5 min)
   - 5 quick questions
   - Code prediction

5. **DELIBERATE PRACTICE** (15 min)
   - 3 exercises at my level
   - Immediate feedback

6. **INTERVIEW PREP** (5 min)
   - Top 3 interview questions
   - Model answers

7. **FLASHCARDS TO CREATE** (5 min)
   - 5 cards for spaced repetition

8. **NEXT STEPS**
   - What to learn next
   - Practice recommendations

My current level: [BEGINNER/INTERMEDIATE/ADVANCED]
My goal: [What I want to be able to do]
Time available: [X] minutes

Let's master [TOPIC]!
```

---

## 📌 HOW TO USE THESE PROMPTS

1. **Copy** the prompt template you need
2. **Replace** `[TOPIC]` with your concept (e.g., "decorators", "generators", "list comprehensions")
3. **Fill in** any personal context sections
4. **Paste** into Claude or your AI tutor
5. **Engage** actively with the response
6. **Follow up** with clarifying questions

---

## 🔄 SUGGESTED LEARNING FLOW

```
Day 1: First Principles + Feynman → Build foundation
Day 2: Mental Model + Show Your Work → Solidify understanding  
Day 3: Active Recall + Deliberate Practice → Test knowledge
Day 4: Interleaving + Error Analysis → Deepen mastery
Day 5: Interview Prep + Code Review → Prepare for application
Day 6: Project-Based Learning → Apply everything
Day 7: Quick Revision + Retrieval Practice → Cement learning
```

---

*"The best time to plant a tree was 20 years ago. The second best time is now."*

**Start with any prompt. Start today. Start learning!** 🚀
