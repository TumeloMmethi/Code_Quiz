<?php
// Allow requests from any origin (CORS header for React frontend)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Get the topic from the query parameter
$topic = strtolower(trim($_GET['topic'] ?? ''));

// Define questions for each topic
$questions = [
    "javascript" => [
        [
            "question" => "What is the output of: `console.log(typeof null)`?",
            "options" => ["object", "null", "undefined", "number"],
            "answer" => "object"
        ],
        [
            "question" => "Which company developed JavaScript?",
            "options" => ["Mozilla", "Netscape", "Microsoft", "Apple"],
            "answer" => "Netscape"
        ],
        [
            "question" => "Which symbol is used for comments in JavaScript?",
            "options" => ["//", "/* */", "#", "<!-- -->"],
            "answer" => "//"
        ],
        [
            "question" => "How do you declare a variable in JavaScript?",
            "options" => ["var", "let", "const", "All of the above"],
            "answer" => "All of the above"
        ],
        [
            "question" => "What will `typeof NaN` return?",
            "options" => ["NaN", "undefined", "number", "object"],
            "answer" => "number"
        ],
        [
            "question" => "Which method is used to parse a JSON string?",
            "options" => ["JSON.stringify()", "JSON.parse()", "JSON.decode()", "JSON.read()"],
            "answer" => "JSON.parse()"
        ],
        [
            "question" => "What does `===` mean in JavaScript?",
            "options" => ["Assignment", "Equality", "Strict equality", "Logical AND"],
            "answer" => "Strict equality"
        ],
        [
            "question" => "How do you write an arrow function?",
            "options" => ["() => {}", "function => {}", "[] => {}", "{} -> {}"],
            "answer" => "() => {}"
        ],
        [
            "question" => "What is a closure in JavaScript?",
            "options" => [
                "A way to close windows",
                "A function having access to its own scope, outer function's scope and global scope",
                "An object with state",
                "None of the above"
            ],
            "answer" => "A function having access to its own scope, outer function's scope and global scope"
        ],
        [
            "question" => "Which keyword is used to handle exceptions?",
            "options" => ["try", "catch", "finally", "All of the above"],
            "answer" => "All of the above"
        ],
        [
            "question" => "Which of these is not a loop in JavaScript?",
            "options" => ["for", "while", "foreach", "do-while"],
            "answer" => "foreach"
        ],
        [
            "question" => "What will `console.log(2 + '2')` output?",
            "options" => ["4", "22", "NaN", "undefined"],
            "answer" => "22"
        ]
    ],
    "react" => [
        [
            "question" => "Which hook is used to manage state in a functional component?",
            "options" => ["useEffect", "useState", "useRef", "useContext"],
            "answer" => "useState"
        ],
        [
            "question" => "Which of the following is used to create components in React?",
            "options" => ["function", "class", "both", "none"],
            "answer" => "both"
        ],
        [
            "question" => "What is the default port for a React app?",
            "options" => ["3000", "8000", "5000", "8080"],
            "answer" => "3000"
        ],
        [
            "question" => "Which hook is used for side effects in React?",
            "options" => ["useState", "useEffect", "useReducer", "useRef"],
            "answer" => "useEffect"
        ],
        [
            "question" => "What is JSX?",
            "options" => ["A JavaScript library", "JavaScript XML", "React plugin", "JSON extension"],
            "answer" => "JavaScript XML"
        ],
        [
            "question" => "What is the parent of all components in React?",
            "options" => ["App", "Root", "Index", "Main"],
            "answer" => "App"
        ],
        [
            "question" => "Which lifecycle method is called after component is mounted?",
            "options" => ["componentDidMount", "componentWillMount", "render", "shouldComponentUpdate"],
            "answer" => "componentDidMount"
        ],
        [
            "question" => "Which prop is used to pass data?",
            "options" => ["state", "props", "setState", "data"],
            "answer" => "props"
        ],
        [
            "question" => "What is used to route pages in React?",
            "options" => ["React Router", "useRouter", "Switch", "Navigate"],
            "answer" => "React Router"
        ],
        [
            "question" => "How do you update state in React?",
            "options" => ["setState()", "update()", "this.update()", "changeState()"],
            "answer" => "setState()"
        ],
        [
            "question" => "How many elements can a React component return?",
            "options" => ["One parent element", "Many elements", "Only text", "Any number"],
            "answer" => "One parent element"
        ],
        [
            "question" => "What does `useRef` do?",
            "options" => ["Creates state", "Handles props", "Accesses DOM", "Creates router"],
            "answer" => "Accesses DOM"
        ]
    ],
    "html" => [
        [
            "question" => "What does HTML stand for?",
            "options" => ["Hyper Text Markup Language", "HighText Machine Language", "Hyper Tabular Markup Language", "None of these"],
            "answer" => "Hyper Text Markup Language"
        ],
        [
            "question" => "Which tag is used to create a hyperlink in HTML?",
            "options" => ["<link>", "<a>", "<href>", "<hyper>"],
            "answer" => "<a>"
        ],
        [
            "question" => "Which tag defines the largest heading?",
            "options" => ["<h1>", "<head>", "<heading>", "<h6>"],
            "answer" => "<h1>"
        ],
        [
            "question" => "Which tag is used for line breaks?",
            "options" => ["<br>", "<lb>", "<break>", "<ln>"],
            "answer" => "<br>"
        ],
        [
            "question" => "What tag is used for creating a table row?",
            "options" => ["<tr>", "<td>", "<th>", "<table>"],
            "answer" => "<tr>"
        ],
        [
            "question" => "Which attribute is used to provide tooltip text?",
            "options" => ["title", "alt", "tooltip", "label"],
            "answer" => "title"
        ],
        [
            "question" => "Which input type is used for passwords?",
            "options" => ["password", "text", "hidden", "secure"],
            "answer" => "password"
        ],
        [
            "question" => "How do you add a comment in HTML?",
            "options" => ["<!-- comment -->", "// comment", "/* comment */", "# comment"],
            "answer" => "<!-- comment -->"
        ],
        [
            "question" => "What is the correct DOCTYPE for HTML5?",
            "options" => ["<!DOCTYPE html>", "<html5>", "<doctype html5>", "<doc html>"],
            "answer" => "<!DOCTYPE html>"
        ],
        [
            "question" => "Which tag is used for inserting an image?",
            "options" => ["<img>", "<image>", "<src>", "<picture>"],
            "answer" => "<img>"
        ],
        [
            "question" => "What does the `<meta>` tag provide?",
            "options" => ["Metadata", "Images", "Links", "Scripts"],
            "answer" => "Metadata"
        ],
        [
            "question" => "Which tag is used to define a form?",
            "options" => ["<form>", "<input>", "<field>", "<submit>"],
            "answer" => "<form>"
        ]
    ],
    "css" => [
        [
            "question" => "Which property is used to change the background color?",
            "options" => ["color", "bgcolor", "background-color", "background"],
            "answer" => "background-color"
        ],
        [
            "question" => "Which CSS property controls the text size?",
            "options" => ["font-size", "text-style", "text-size", "font-style"],
            "answer" => "font-size"
        ],
        [
            "question" => "What does CSS stand for?",
            "options" => ["Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets", "Computer Style Sheets"],
            "answer" => "Cascading Style Sheets"
        ],
        [
            "question" => "Which selector targets all elements?",
            "options" => ["*", "all", "html", "."],
            "answer" => "*"
        ],
        [
            "question" => "What is the correct syntax for a class?",
            "options" => [".class", "#class", "class:", "<class>"],
            "answer" => ".class"
        ],
        [
            "question" => "How do you make text bold?",
            "options" => ["font-weight: bold;", "text-bold: true;", "font-style: bold;", "weight: bold;"],
            "answer" => "font-weight: bold;"
        ],
        [
            "question" => "Which unit is relative to the root element?",
            "options" => ["em", "rem", "%", "px"],
            "answer" => "rem"
        ],
        [
            "question" => "Which property is used for spacing outside elements?",
            "options" => ["margin", "padding", "space", "border"],
            "answer" => "margin"
        ],
        [
            "question" => "How do you center a block element?",
            "options" => ["margin: 0 auto;", "text-align: center;", "display: center;", "center: true;"],
            "answer" => "margin: 0 auto;"
        ],
        [
            "question" => "Which value of `position` makes an element follow the page scroll?",
            "options" => ["fixed", "absolute", "relative", "static"],
            "answer" => "fixed"
        ],
        [
            "question" => "What property makes an element a flex container?",
            "options" => ["display: flex;", "flex: container;", "position: flex;", "flex-wrap: true;"],
            "answer" => "display: flex;"
        ],
        [
            "question" => "What property changes the font?",
            "options" => ["font-family", "font-type", "text-font", "font-style"],
            "answer" => "font-family"
        ]
    ],
    "php" => [
        [
            "question" => "What does PHP stand for?",
            "options" => ["Personal Hypertext Processor", "Preprocessor Home Page", "PHP: Hypertext Preprocessor", "Private Hypertext Processor"],
            "answer" => "PHP: Hypertext Preprocessor"
        ],
        [
            "question" => "Which symbol is used to declare a variable in PHP?",
            "options" => ["$", "#", "@", "&"],
            "answer" => "$"
        ],
        [
            "question" => "Which function is used to output text in PHP?",
            "options" => ["echo", "print", "write", "All of the above"],
            "answer" => "All of the above"
        ],
        [
            "question" => "Which superglobal is used to collect form data?",
            "options" => ["\$_POST", "\$_GET", "\$_REQUEST", "All of the above"],
            "answer" => "All of the above"
        ],
        [
            "question" => "How do you define a constant in PHP?",
            "options" => ["define()", "const", "set()", "constant()"],
            "answer" => "define()"
        ],
        [
            "question" => "Which keyword is used to create a function?",
            "options" => ["function", "def", "create", "fn"],
            "answer" => "function"
        ],
        [
            "question" => "How do you end a PHP statement?",
            "options" => [";", ":", ".", "/"],
            "answer" => ";"
        ],
        [
            "question" => "What is the file extension for PHP?",
            "options" => [".php", ".html", ".js", ".py"],
            "answer" => ".php"
        ],
        [
            "question" => "Which function is used to connect to a MySQL database?",
            "options" => ["mysqli_connect()", "connect_db()", "mysql_open()", "db_connect()"],
            "answer" => "mysqli_connect()"
        ],
        [
            "question" => "Which symbol is used for concatenation?",
            "options" => [".", "+", "&", ","],
            "answer" => "."
        ],
        [
            "question" => "What will `strlen('PHP')` return?",
            "options" => ["3", "2", "1", "4"],
            "answer" => "3"
        ],
        [
            "question" => "What is the correct way to start a PHP block?",
            "options" => ["<?php", "<?", "<script>", "<php>"],
            "answer" => "<?php"
        ]
    ]
];

// Return questions or empty array
if (array_key_exists($topic, $questions)) {
    echo json_encode($questions[$topic]);
} else {
    echo json_encode([]);
}
