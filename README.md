
# CodeVisor
CodeVisor is a web application that takes a program from the user and generates a flowchart.

In the past few years, generative AI tools have helped us considerably to digest other people's code and improve our own code. Despite their linguistic versatility, their visual skills are relatively primitive, and we're worried that the more visually inclined are being left out in the race to achieve general artificial intelligence. That's why we wanted to design a developer-oriented alternative to tools like ChatGPT to bring these folks "back in the loop".

We architected CodeVisor with familiar websites like CodePen and JSFiddle in mind—to be simple and to-the-point. CodeVisor presents the user with two panes—the code pane and the preview pane—that enable them to submit code they'd like to be explained visually. The user clicks "Generate", which populates the preview pane with a (mostly) code-free flowchart that traces through the execution of the program. CodeVisor takes advantage of exclusively visual cues like color, shape, space, and placement, to communicate the story the program conveys in an easily accessible format.

We began by experimenting with different pipelines, first asking GPT to generate an image with DALL-E, then asking it to write LaTeX code, and eventually settling on a format called Graphviz that produced the kind of high-accuracy flowcharts we were satisfied with. In its final iteration, the product feeds the user's code to GPT, requesting a Graphviz file containing the nodes, edges, and styles that comprise the end-result. Graphviz offered many advantages for us, since the format is straightforward for GPT to understand and gives it less control over complicated typesetting features that it's likely to misapply.

## Screenshots

![App Screenshot](https://drive.google.com/file/d/1ZzvwgmJkPuxI8jKqxx_uaU_DByZhrR1-/view?usp=sharing)


## Demo

https://www.youtube.com/watch?v=jiijgr1a--A&t=52s&ab_channel=JadenPeterson


## Authors

- [@jadenPete](https://github.com/jadenPete)
- [@aravinds13](https://github.com/aravinds13)
- [@shreyash0k](https://github.com/shreyash0k/)
