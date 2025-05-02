<?php
// DEBUG: Show PHP errors during development
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Database credentials
$host = 'localhost';
$dbname = 'quiz_app';
$username = 'root';
$password = ''; // Replace with your DB password if needed

// Connect to MySQL
$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Get topic and difficulty
$topic = isset($_GET['topic']) ? strtolower(trim($_GET['topic'])) : '';
$difficulty = isset($_GET['difficulty']) ? strtolower(trim($_GET['difficulty'])) : '';

if (!$topic || !$difficulty) {
    http_response_code(400);
    echo json_encode(["error" => "Missing topic or difficulty"]);
    exit;
}

// Prepare query
$stmt = $conn->prepare("SELECT question, option_a, option_b, option_c, option_d, answer FROM questions WHERE topic = ? AND difficulty = ?");
$stmt->bind_param("ss", $topic, $difficulty);
$stmt->execute();
$result = $stmt->get_result();

// Collect results
$questions = [];
while ($row = $result->fetch_assoc()) {
    $questions[] = [
        "question" => $row['question'],
        "options" => [
            $row['option_a'],
            $row['option_b'],
            $row['option_c'],
            $row['option_d']
        ],
        "answer" => $row['answer']
    ];
}

// Output valid JSON
echo json_encode($questions);

$stmt->close();
$conn->close();
