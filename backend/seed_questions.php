<?php
// Enable error reporting for development
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// DB credentials
$host = 'localhost';
$dbname = 'quiz_app';
$username = 'root';
$password = ''; // Change if needed

// Connect to DB
$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Define questions
$questions = [
    // HTML
    ['html', 'easy', 'What does HTML stand for?', 'Hyper Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language', 'Hyper Tool Multi Language', 'Hyper Text Markup Language'],
    ['html', 'easy', 'Which tag is used for the largest heading in HTML?', '<h1>', '<heading>', '<h6>', '<head>', '<h1>'],
    ['html', 'medium', 'Which tag is used to insert an image?', '<img>', '<image>', '<src>', '<picture>', '<img>'],
    ['html', 'medium', 'Which attribute is used to provide a tooltip?', 'title', 'alt', 'tooltip', 'hover', 'title'],
    ['html', 'hard', 'Which doctype declaration is correct for HTML5?', '<!DOCTYPE html>', '<doctype html>', '<html doctype>', '<!HTML5>', '<!DOCTYPE html>'],
    ['html', 'hard', 'What does the "action" attribute in a form do?', 'Specifies where to send the form data', 'Defines how to validate input', 'Determines form layout', 'Connects to the database', 'Specifies where to send the form data'],

    // CSS
    ['css', 'easy', 'What does CSS stand for?', 'Cascading Style Sheets', 'Colorful Style Sheets', 'Creative Style Syntax', 'Computer Style System', 'Cascading Style Sheets'],
    ['css', 'easy', 'Which CSS property is used to change text color?', 'color', 'font-color', 'text-color', 'text-style', 'color'],
    ['css', 'medium', 'What is the default position value of an element?', 'static', 'relative', 'absolute', 'fixed', 'static'],
    ['css', 'medium', 'Which property controls the stacking order?', 'z-index', 'stack', 'layer', 'index', 'z-index'],
    ['css', 'hard', 'How do you apply styles to a specific ID in CSS?', '#id', '.id', 'id', '*id', '#id'],
    ['css', 'hard', 'Which unit is relative to the font-size of the element?', 'em', 'px', '%', 'vh', 'em'],

    // JavaScript
    ['javascript', 'easy', 'Which company developed JavaScript?', 'Netscape', 'Microsoft', 'Apple', 'Mozilla', 'Netscape'],
    ['javascript', 'easy', 'What is the output of console.log(typeof null)?', 'object', 'null', 'undefined', 'number', 'object'],
    ['javascript', 'medium', 'Which symbol is used for comments in JavaScript?', '//', '/*', '#', '<!--', '//'],
    ['javascript', 'medium', 'How do you declare a variable in ES6?', 'let', 'var', 'const', 'int', 'let'],
    ['javascript', 'hard', 'What does "this" keyword refer to in a method?', 'The object calling the method', 'Global scope', 'Window object', 'Function itself', 'The object calling the method'],
    ['javascript', 'hard', 'What is the result of [] + {} in JavaScript?', '[object Object]', 'NaN', 'undefined', 'TypeError', '[object Object]'],

    // React
    ['react', 'easy', 'What is the default file extension for React components?', '.jsx', '.js', '.html', '.component', '.jsx'],
    ['react', 'easy', 'Which hook is used for state in functional components?', 'useState', 'useEffect', 'useReducer', 'useRef', 'useState'],
    ['react', 'medium', 'What is a controlled component?', 'A component with form elements tied to state', 'A reusable component', 'A higher-order component', 'A component managed by Redux', 'A component with form elements tied to state'],
    ['react', 'medium', 'Which hook is used to perform side effects?', 'useEffect', 'useState', 'useContext', 'useCallback', 'useEffect'],
    ['react', 'hard', 'What does React.memo do?', 'Prevents re-rendering if props don’t change', 'Memoizes functions', 'Manages state', 'Cleans up side effects', 'Prevents re-rendering if props don’t change'],
    ['react', 'hard', 'What is the virtual DOM?', 'A lightweight copy of the real DOM', 'The actual browser DOM', 'React memory space', 'Component tree', 'A lightweight copy of the real DOM'],

    // PHP
    ['php', 'easy', 'What does PHP stand for?', 'Hypertext Preprocessor', 'Personal Home Page', 'Private Hosting Program', 'Pre Hypertext Processor', 'Hypertext Preprocessor'],
    ['php', 'easy', 'Which symbol is used to start a PHP variable?', '$', '@', '#', '&', '$'],
    ['php', 'medium', 'Which function is used to include files in PHP?', 'include()', 'import()', 'require_once()', 'insert()', 'include()'],
    ['php', 'medium', 'How do you start a PHP session?', 'session_start()', 'start_session()', 'session()', 'session_begin()', 'session_start()'],
    ['php', 'hard', 'What is the purpose of htmlentities()?', 'Convert characters to HTML entities', 'Escape quotes', 'Strip HTML tags', 'Encrypt data', 'Convert characters to HTML entities'],
    ['php', 'hard', 'Which superglobal is used to collect form data?', '$_POST', '$_DATA', '$_FORM', '$_GETPOST', '$_POST'],
];

// Prepare and insert data
$stmt = $conn->prepare("INSERT INTO questions (topic, difficulty, question, option_a, option_b, option_c, option_d, answer) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

foreach ($questions as $q) {
    $stmt->bind_param("ssssssss", $q[0], $q[1], $q[2], $q[3], $q[4], $q[5], $q[6], $q[7]);
    $stmt->execute();
}

$stmt->close();
$conn->close();

echo "✅ Questions inserted successfully.";
?>
