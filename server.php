<?php
//нижній рядок дозволяє працювати з джсон форматом
$_POST = json_decode(file_get_contents('php://input'), true);
echo var_dump($_POST);