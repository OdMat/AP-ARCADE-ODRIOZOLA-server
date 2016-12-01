<!-- index.php -->
<html>
<head>
	<title>Juego</title>
	<link rel="stylesheet"  type="text/css" href="css\juego.css">
	<link rel="icon" href="images/favicon.ico">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<script src="js/jquery-3.1.1.min.js"></script>
	<script src="js/topList.js"></script>
</head>
	<body>
		<div id="container"><!--____Contenedor_____ -->
			<?php
			    include_once("highscore.php");
			    include_once("configDB.php");
			    $db = new mysqli($host,$user,$password,$database);
			    if ($db->connect_error)
			        die('Error');
				$p=new highscore($_POST['mov'],$_POST['time'],$_POST['name']);
				$p->addToDB($db);
			?>
			<div id="buttons">
				<div id="listMov">
					<p>Mov List</p>
				</div>
				<div id="listTime">
					<p>Time List</p>
				</div>
			</div>
			<div id="lists">
				<div id="listMoves">
					<?php
						$p->mostrarMov($db);
					?>
				</div>
				<div id="listTimes">
					<?php
						$p->mostrarTime($db);
					?>
				</div>
			</div>
		</div>
	</body>
</html>