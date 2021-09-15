<?php

    // Name: Raymon Bikram Basnyat
    // University id = 2059640
    // Prototype 3

    // Variables needed in the database connection.
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "weather_data"; // Database name.

    // Creating connection with database.
    $conn = new mysqli($servername, $username, $password, $dbname);

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Max-Age: 1000");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
  
    // Changing the default  time in php.
    date_default_timezone_set('Asia/Kathmandu');

    // Function to update data in database.

    function dataQuery($conn)
    {
        // calling API(OpenWeatherAPI)
        // city "$_GET['city']" name is taken after submitting the form in html.
        // Java script calls the php api with city name in it. 
        // '.$_GET['city'].' gets the name of the city from the url.
        $url = 'http://api.openweathermap.org/data/2.5/weather?q='.$_GET['city'].'&appid=0de6fc00abc79dc9398e8181bd49765c';

        // Decoding the JSON data obtained from the Openweathermap.org.
        // Json_decode is used for decoding the JSON string.
        $data = file_get_contents($url);
        $json = json_decode($data, true);

        // Fetching values from required field and also storing them in variables.
        // These variables are being used in Sql queries to store the data in database.

        // Main weather of the city.
        $weather_main = $json["weather"][0]["main"];

        // Weather description of the city.
        $weather_description = $json['weather'][0]['description']; 

        // Current temperature of the city.
        $weather_temperature = $json['main']['temp']; 

        // Wind speed of the city.
        $weather_wind = $json['wind']['speed']; 

        // Minimum temperature of the city. 
        $temp_min = $json['main']['temp_min']; 

        // Maximum temperature of the city.
        $temp_max = $json['main']['temp_max']; 

        // City name.
        $city = $json['name'];

        // Country name.
        $country = $json['sys']['country']; 
        
        // Humidity.
        $humidity = $json['main']['humidity']; 

        // Pressure.
        $pressure = $json['main']['pressure']; 

        // Current time.
        $weather_when = date("Y-m-d H:i:s"); 

        // Build 'UPDATE' sql statement.
        $sql = "UPDATE `fetched_info` SET `weather_main` = '$weather_main', `weather_desc` = '$weather_description', `weather_temp`= '$weather_temperature',`weather_wind`='$weather_wind', weather_when ='$weather_when', `temp_low`='$temp_min', `temp_high`='$temp_max', `pressure`='$pressure', `humidity`='$humidity', `city`='$city', `country`='$country' WHERE city='{$_GET['city']}'";
        
        // Run sql statement and report errors
        if (!$conn -> query($sql)) 
        {
          echo("<h4>SQL error description: " . $conn -> error . "</h4>");
        }
    }
    
    // Build 'SELECT' sql statement.
    // Selecting data from sql database where city name = '{$_GET['city']}' which has been submitted by the user.
    // mysqli_num_rows() gets the number of row that envolves the city name.
    $sql = "SELECT * FROM fetched_info WHERE city = '{$_GET['city']}'";
    $checkdb = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($checkdb,MYSQLI_ASSOC);
    $check = mysqli_num_rows($checkdb);

    // Checking if the city is already in database or not.
    // If there is no matching city in sql database then mysqli_num_rows() return zero.

    // If the city does not exist.
    if($check == 0)
    {
        // Calling API(OpenWeatherAPI).
        // "$_GET['city']" gets the name of the city.
        $url = 'http://api.openweathermap.org/data/2.5/weather?q='.$_GET['city'].'&appid=0de6fc00abc79dc9398e8181bd49765c';
        $data = file_get_contents($url);
        $json = json_decode($data, true);

        // Error exception if the json data is null.
        // If invalid city is provided then the null value is returned.
        if($json == null)
        {
           echo "404 Error!";
        }

        // If the data is not null.
        // Inserting the data fetched from API into database.
        else
        {
          
          // Main weather of the city.
          $weather_main = $json["weather"][0]["main"];

          // Weather description of the city.
          $weather_description = $json['weather'][0]['description'];

          // Current temperature of the city.
          $weather_temperature = $json['main']['temp'];

          // Wind speed of the city.
          $weather_wind = $json['wind']['speed'];

          // Minimum temperature of the city. 
          $temp_min = $json['main']['temp_min'];

          // Maximum temperature of the city.
          $temp_max = $json['main']['temp_max'];

          // City name.
          $city = $json['name'];

          // Country name.
          $country = $json['sys']['country'];

          // Humidity.
          $humidity = $json['main']['humidity'];

          // Pressure.
          $pressure = $json['main']['pressure'];

          // Current time.
          $weather_when = date("Y-m-d H:i:s"); 

          // Build INSERT sql statement.
          // Inserting the data obtained from calling the api into sql database.
          $sql = "INSERT INTO fetched_info (weather_main, weather_desc, weather_temp, weather_wind, weather_when, city, country, temp_low, temp_high, humidity, pressure)
          VALUES('{$weather_main}','{$weather_description}', '{$weather_temperature}', '{$weather_wind}', '{$weather_when}', '{$city}','{$country}','{$temp_min}','{$temp_max}','{$humidity}','{$pressure}')";

          // Run SQL statement and report errors.
          if (!$conn -> query($sql)){
           echo("<h4>SQL error description: " . $conn -> error . "</h4>");
          }
       }
    }

    // If the city already exists in the database.
    // Incontext of dublication in the database the data is being updated on the basis of time.
    // If the data in the database is 10 second older than it is being updated.
    else{

        // Build SELECT sql statement.
        $sql = "SELECT * FROM fetched_info WHERE city ='{$_GET['city']}'";
        $checkdb = mysqli_query($conn, $sql);
        $row = mysqli_fetch_array($checkdb,MYSQLI_ASSOC);

        // Getting time from the array.
        $time = $row['weather_when'];

        // Splitting date and time 
        $arr = explode(" ",$time);

        // Getting date in Year-Month-Day.
        $newdate = date("Y-m-d");

        // If current date is ahead of the date in database.
        if($arr[0] < $newdate)
        {
          // Calling function that updates data in database(dataQuery())
          dataQuery($conn);
        }

        // If current date is equal to the date in database.
        else
        {
          // Adding 10 seconds to the time in database.
          $newtime = strtotime($arr[1]) + (10);
          $added = date("H:i:s",$newtime);
          $weather_when = date("H:i:s");

          // If the current time is ahead of the time in database.
          if($weather_when >= $added)
            {
              // Calling function that updates data in database(dataQuery()).
              dataQuery($conn);
            }
        }
    }

    // Execute SQL query
    // Selecting all the data from database where city name = {$_GET['city']}.
    $sql = "SELECT * FROM fetched_info WHERE city='{$_GET['city']}'";
    $result = $conn -> query($sql);

    // Get data, convert to JSON and print.
    // json_encode encode the data obtained from the database into Json string.
    $row = $result -> fetch_assoc();
    print json_encode($row);

    // Free result set and close connection.
    $result -> free_result();
    $conn -> close();

?>

