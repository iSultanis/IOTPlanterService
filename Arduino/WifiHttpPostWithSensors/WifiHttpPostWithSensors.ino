/*
  Repeating Wifi Web Client

 This sketch connects to a a web server and makes a request
 using a WiFi equipped Arduino board.

 created 23 April 2012
 modified 31 May 2012
 by Tom Igoe
 modified 13 Jan 2014
 by Federico Vanzati

 http://www.arduino.cc/en/Tutorial/WifiWebClientRepeating
 This code is in the public domain.
 */

#include <ArduinoHttpClient.h>
#include <SPI.h>
#include <WiFiNINA.h>

#include "arduino_secrets.h" 
///////please enter your sensitive data in the Secret tab/arduino_secrets.h
char ssid[] = SECRET_SSID;        // your network SSID (name)
char pass[] = SECRET_PASS;    // your network password (use for WPA, or use as key for WEP)
int keyIndex = 0;            // your network key Index number (needed only for WEP)

int humiditySensor = A0;
int tempSensor = A2;
int luxSensor = A1;
int tempRead, luxRead, humRead = 0;
double tempCalc, luxCalc = 0;

int status = WL_IDLE_STATUS;

// server address:
//char server[] = "example.org";
IPAddress server(31,20,118,71);
//IPAddress server(192,168,43,73);

int port = 3050;

// Initialize the Wifi client library
WiFiClient client;
HttpClient http = HttpClient(client, server, port);

const unsigned long postingInterval = 1800L * 1000L; // delay between updates, in milliseconds

void setup() {
  //Initialize serial and wait for port to open:
  Serial.begin(57600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }


  pinMode(tempSensor, INPUT);
  pinMode(luxSensor, INPUT);
  pinMode(humiditySensor, INPUT);
  // check for the WiFi module:
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("Communication with WiFi module failed!");
    // don't continue
    while (true);
  }

  String fv = WiFi.firmwareVersion();
  if (fv < "1.0.0") {
    Serial.println("Please upgrade the firmware");
  }

  // attempt to connect to Wifi network:
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:
    delay(10000);
  }
  // you're connected now, so print out the status:
  printWifiStatus();
}

boolean oldRequestNotDone = true;   

void loop()
{
    // Get sensor values
    Serial.print("Temperature Sensor Value: ");
    tempRead = analogRead(tempSensor);
    tempCalc = (tempRead/1023*222.2)-61.111;
    Serial.println(tempCalc);
    Serial.print("Light Sensor Value: ");
    luxRead = analogRead(luxSensor);
    luxCalc = luxRead*200;
    Serial.println(luxCalc);
    Serial.print("Moisture Sensor Value: ");
    humRead = analogRead(humiditySensor);
    Serial.println(humRead);
    
    if(oldRequestNotDone)
    {
          if(http.connect(server, 3050))
          {
                httpRequest();
          }
    }
    else
      {
        // if you didn't get a connection to the server:
        Serial.println("connection failed");
      }
      oldRequestNotDone = false;

     // if there are incoming bytes available
     // from the server, read them and print them:
     if (client.available())
     {
       char c = client.read();
       Serial.print(c);
     }
     // if the server's disconnected, stop the client:
     if (!client.available() && !client.connected())
     {
       Serial.println();
       Serial.println("disconnecting.");
       client.stop();
   
      oldRequestNotDone = true;
     }
     delay(postingInterval);
}

// this method makes a HTTP connection to the server:
void httpRequest() {
  Serial.println("making POST request");
  String contentType = "application/json";
  String postData =
    "{\"lux\": 100000,\"temp\": 20,\"humidity\": 200, \"date\": 1575551551388}";
    
  http.beginRequest();
  http.post("/sensor");
  http.sendHeader("Content-Type", "application/json");
  http.sendHeader("Content-Length", postData.length());
  http.sendHeader("Connection", "close");
  http.endRequest();
//  http.write((const byte*)postData.c_str(), postData.length());
  // note: the above line can also be achieved with the simpler line below:
  http.print(postData);

  // read the status code and body of the response
  int statusCode = http.responseStatusCode();
  String response = http.responseBody();

  Serial.print("POST Status code: ");
  Serial.println(statusCode);
  Serial.print("POST Response: ");
  Serial.println(response);
}


void printWifiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your board's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}
