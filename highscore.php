<?php 
	class highscore{
		private $mov;
		private $time;
		private $name;

		public function __construct($mov,$time,$name){
			$this->mov = $mov;
			$this->time = $time;
			$this->name = $name;
		}
		public static function mostrarTime($db){
			$select="select * from highscores order by sec limit 11";
			$cont=0;	
			if ($resultado = $db->query($select)) {
			    while ($query = $resultado->fetch_assoc()) {
			    	$cont++;
			    	echo'<div>
			    		<p>',$cont,"°: ",$query['name'],' -</p>
			    		<p>',$query['sec'],' seg</p>
			    	</div>';
			    }
			    $resultado->free();
			}
		}
		public static function mostrarMov($db){
			$select="select * from highscores order by mov limit 11";
			$cont=0;	
			if ($resultado = $db->query($select)) {
			    while ($query = $resultado->fetch_assoc()) {
			    	$cont++;
			    	echo'<div>
			    		<p>',$cont,"°: ",$query['name'],' -</p>
			    		<p>',$query['mov'],' moves</p>
			    	</div>';
			    }
			    $resultado->free();
			}
		}
		public function addToDB($db){
			$select=$db->query("select * from highscores where name='$this->name' and mov=$this->mov and sec=$this->time");
			if(!$select || $select->num_rows==0){
				$insert="insert into highscores(name,mov,sec) values ('$this->name','$this->mov','$this->time')";
				$db->query($insert);
			}
		}
		public function deleteFromDB($db){
			$delete="delete from highscores where name=$this->name";
			//sacar de la base de datos
		}
	}
?>