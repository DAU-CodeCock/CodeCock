import React, { useState, useEffect } from "react";

const MentorTestPage = () => {
  const [role, setRole] = useState(""); // "mentor" or "mentee"

  // 문제 세트
  const predefinedQuestions = {
    C: [
      {
        question: "C에서 헤더 파일을 포함하는 올바른 문법은 무엇인가요?",
        options: ["#include <stdio.h>", "#include <stdio>", "include <stdio.h>", "#include <stdio>"],
        correctAnswer: "#include <stdio.h>",
      },
      {
        question: "C에서 정수의 크기는 얼마인가요?",
        options: ["4 bytes", "2 bytes", "8 bytes", "1 byte"],
        correctAnswer: "4 bytes",
      },
      {
        question: "C에서 변수의 주소를 얻기 위해 사용되는 연산자는 무엇인가요?",
        options: ["&", "#", "$", "%"],
        correctAnswer: "&",
      },
      {
        question: "C에서 상수를 정의하는 방법은 무엇인가요?",
        options: ["#define constant 10", "const constant = 10", "constant = 10", "define constant = 10"],
        correctAnswer: "#define constant 10",
      },
      {
        question: "C에서 콘솔에 데이터를 출력하는 함수는 무엇인가요?",
        options: ["print()", "printf()", "cout()", "write()"],
        correctAnswer: "printf()",
      },
    ],
    Python: [
      {
        question: "파이썬에서 함수를 정의하는 방법은 무엇인가요?",
        options: ["def function_name():", "function_name()", "function function_name():", "def function_name()"],
        correctAnswer: "def function_name():",
      },
      {
        question: "다음 중 변경 가능한 데이터 타입은 무엇인가요?",
        options: ["list", "tuple", "string", "int"],
        correctAnswer: "list",
      },
      {
        question: "파이썬에서 리스트의 길이를 얻는 함수는 무엇인가요?",
        options: ["len()", "size()", "length()", "count()"],
        correctAnswer: "len()",
      },
      {
        question: "'==' 연산자는 무엇을 하나요?",
        options: ["값을 할당한다", "두 값을 비교한다", "두 값을 더한다", "변수 이름을 비교한다"],
        correctAnswer: "두 값을 비교한다",
      },
      {
        question: "파이썬에서 리스트에 항목을 추가하는 메서드는 무엇인가요?",
        options: ["add()", "append()", "push()", "insert()"],
        correctAnswer: "append()",
      },
    ],
    Java: [
      {
        question: "자바에서 변수란 무엇이며 어떻게 선언하나요?",
        options: ["int x = 10;", "x = 10;", "var x = 10;", "let x = 10;"],
        correctAnswer: "int x = 10;",
      },
      {
        question: "'public static void main(String[] args)' 메서드의 목적은 무엇인가요?",
        options: ["자바 애플리케이션의 진입점이다", "새로운 클래스를 정의한다", "새로운 스레드를 시작한다", "생성자를 정의한다"],
        correctAnswer: "자바 애플리케이션의 진입점이다",
      },
      {
        question: "자바에서 'int'의 크기는 얼마인가요?",
        options: ["2 bytes", "4 bytes", "8 bytes", "16 bytes"],
        correctAnswer: "4 bytes",
      },
      {
        question: "자바에서 루프를 생성하는 방법은 무엇인가요?",
        options: ["for(int i = 0; i < 10; i++)", "loop(i = 0; i < 10; i++)", "for(i < 10; i++)", "loop(i; i < 10; i++)"],
        correctAnswer: "for(int i = 0; i < 10; i++)",
      },
      {
        question: "자바에서 배열을 선언하는 올바른 문법은 무엇인가요?",
        options: ["int[] arr;", "arr[] int;", "array int[];", "int arr[];"],
        correctAnswer: "int[] arr;",
      },
    ],
  };

  // 멘토 버튼을 클릭했을 때 팝업창에서 언어 선택
  const openTestWindow = () => {
    const testWindow = window.open(
      "",
      "_blank",
      "width=600,height=800,scrollbars=yes"
    );

    testWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mentor Test</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            height: 100vh;
          }
          #language-selection {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            text-align: left;
          }
          .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            color: white;
            cursor: pointer;
          }
          .btn.c { background-color: blue; }
          .btn.python { background-color: green; }
          .btn.java { background-color: orange; }
          #questions {
            margin-top: 20px;
          }
          .question {
            margin-bottom: 20px;
          }
          #submit {
            margin-top: 20px;
            padding: 10px;
            background-color: blue;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <h2 style="text-align: left;">Select Your Language</h2>
        <div id="language-selection">
          <button class="btn c" onclick="startTest('C')">C Language</button>
          <button class="btn python" onclick="startTest('Python')">Python</button>
          <button class="btn java" onclick="startTest('Java')">Java</button>
        </div>
        <div id="questions"></div>
        <button id="submit" style="display: none;">Submit Answers</button>
        <div id="result"></div>

        <script>
          let correctAnswers = 0;
          let currentQuestions = [];

          const startTest = async (language) => {
            const questionsDiv = document.getElementById('questions');
            const resultDiv = document.getElementById('result');
            const submitButton = document.getElementById('submit');
            questionsDiv.innerHTML = '<p>Loading questions...</p>';
            resultDiv.innerHTML = '';
            submitButton.style.display = 'none';

            const predefinedQuestions = {
              C: [
                { question: "C에서 헤더 파일을 포함하는 올바른 문법은 무엇인가요?", options: ["#include <stdio.h>", "#include <stdio>", "include <stdio.h>", "#include <stdio>"], correctAnswer: "#include <stdio.h>" },
                { question: "C에서 정수의 크기는 얼마인가요?", options: ["4 bytes", "2 bytes", "8 bytes", "1 byte"], correctAnswer: "4 bytes" },
                { question: "C에서 변수의 주소를 얻기 위해 사용되는 연산자는 무엇인가요?", options: ["&", "#", "$", "%"], correctAnswer: "&" },
                { question: "C에서 상수를 정의하는 방법은 무엇인가요?", options: ["#define constant 10", "const constant = 10", "constant = 10", "define constant = 10"], correctAnswer: "#define constant 10" },
                { question: "C에서 콘솔에 데이터를 출력하는 함수는 무엇인가요?", options: ["print()", "printf()", "cout()", "write()"], correctAnswer: "printf()" }
              ],
              Python: [
                { question: "파이썬에서 함수를 정의하는 방법은 무엇인가요?", options: ["def function_name():", "function_name()", "function function_name():", "def function_name()"], correctAnswer: "def function_name():" },
                { question: "다음 중 변경 가능한 데이터 타입은 무엇인가요?", options: ["list", "tuple", "string", "int"], correctAnswer: "list" },
                { question: "파이썬에서 리스트의 길이를 얻는 함수는 무엇인가요?", options: ["len()", "size()", "length()", "count()"], correctAnswer: "len()" },
                { question: "'==' 연산자는 무엇을 하나요?", options: ["값을 할당한다", "두 값을 비교한다", "두 값을 더한다", "변수 이름을 비교한다"], correctAnswer: "두 값을 비교한다" },
                { question: "파이썬에서 리스트에 항목을 추가하는 메서드는 무엇인가요?", options: ["add()", "append()", "push()", "insert()"], correctAnswer: "append()" }
              ],
              Java: [
                { question: "자바에서 변수란 무엇이며 어떻게 선언하나요?", options: ["int x = 10;", "x = 10;", "var x = 10;", "let x = 10;"], correctAnswer: "int x = 10;" },
                { question: "'public static void main(String[] args)' 메서드의 목적은 무엇인가요?", options: ["자바 애플리케이션의 진입점이다", "새로운 클래스를 정의한다", "새로운 스레드를 시작한다", "생성자를 정의한다"], correctAnswer: "자바 애플리케이션의 진입점이다" },
                { question: "자바에서 'int'의 크기는 얼마인가요?", options: ["2 bytes", "4 bytes", "8 bytes", "16 bytes"], correctAnswer: "4 bytes" },
                { question: "자바에서 루프를 생성하는 방법은 무엇인가요?", options: ["for(int i = 0; i < 10; i++)", "loop(i = 0; i < 10; i++)", "for(i < 10; i++)", "loop(i; i < 10; i++)"], correctAnswer: "for(int i = 0; i < 10; i++)" },
                { question: "자바에서 배열을 선언하는 올바른 문법은 무엇인가요?", options: ["int[] arr;", "arr[] int;", "array int[];", "int arr[];"], correctAnswer: "int[] arr;" }
              ]
            };

            currentQuestions = predefinedQuestions[language];
            renderQuestions(currentQuestions);
          };

          const renderQuestions = (questions) => {
            const questionsDiv = document.getElementById('questions');
            const submitButton = document.getElementById('submit');
            questionsDiv.innerHTML = '';
            correctAnswers = 0;

            questions.forEach((question, index) => {
              const questionDiv = document.createElement('div');
              questionDiv.classList.add('question');
              questionDiv.innerHTML = \`
                <p>\${index + 1}. \${question.question}</p>
                \${question.options.map((option, i) => \`
                  <label><input type="radio" name="question-\${index}" value="\${option}"/> \${option}</label>
                \`).join('')}
              \`;
              questionsDiv.appendChild(questionDiv);
            });

            submitButton.style.display = 'block';
          };

          const checkAnswers = () => {
            correctAnswers = 0;
            currentQuestions.forEach((question, index) => {
              const selectedOption = document.querySelector(\`input[name="question-\${index}"]:checked\`);
              if (selectedOption && selectedOption.value === question.correctAnswer) {
                correctAnswers++;
              }
            });

            if (correctAnswers >= 3) {
              alert("You got " + correctAnswers + " out of " + currentQuestions.length + " correct! You are now a mentor!");
              window.close(); // Close the popup window
              window.opener.postMessage("mentor-passed", "*"); // Send message to parent window
            } else {
              alert("You got " + correctAnswers + " out of " + currentQuestions.length + " correct! Try again.");
            }
          };

          document.getElementById('submit').addEventListener('click', checkAnswers);
        </script>
      </body>
      </html>
    `);

    testWindow.document.close();
  };

  return (
    <div style={{ padding: "20px", textAlign: "left" }}>
      <h3>Mentor Test</h3>
      <div>
        <button
          onClick={() => setRole("mentee")}
          style={{
            padding: "10px",
            margin: "5px",
            backgroundColor: role === "mentee" ? "green" : "gray",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Mentee
        </button>
        <button
          onClick={openTestWindow}
          style={{
            padding: "10px",
            margin: "5px",
            backgroundColor: role === "mentor" ? "green" : "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Mentor
        </button>
      </div>
    </div>
  );
};

export default MentorTestPage;
