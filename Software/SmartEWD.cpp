#include "SmartEWD.h"

#undef 	LED_BUILTIN
#define LED_BUILTIN 2

ESP8266WebServer 	server(80);
bool				AdminEnabled = true;
AccelerationSensor	acc;
double 				pitch;
double 				roll;
double 				accX;
double 				accY;
double 				accZ;

void setup()
{
	Serial.begin(115200);
	delay(500);
	Serial.println("Starting ES8266");
	WiFi.mode(WIFI_AP);

	Serial.println("Configuring AP");

	uint8_t mac[6];
	String 	id;
	String 	hostname;

	WiFi.macAddress(mac);

	for (int i = 3; i < 6; ++i) {
		id += String(mac[i], 16);
	}
	id.toUpperCase();
	hostname 	= "ESP_" + id;
	WiFi.softAP(hostname.c_str() , "12345678");
	WiFi.softAPConfig(IPAddress(192, 168, 4, 1),
					IPAddress(192, 168, 4, 1),
					IPAddress(255, 255, 255, 0));
	yield();
	if (MDNS.begin("esp8266")) {
		Serial.println("MDNS responder started");
	}
	server.on("/", [](){
		String message = "File Not Found\n\n";

		message += "URI: ";
		message += server.uri();
		message += "\nMethod: ";
		message += (server.method() == HTTP_GET)?"GET":"POST";
		message += "\nArguments: ";
		message += server.args();
		message += "\n";
		for (uint8_t i=0; i<server.args(); i++){
			message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
		}
		server.send(404, "text/plain", message);
		yield();
	});
	server.on ("/favicon.ico", []() {
		Serial.println("favicon.ico"); server.send ( 200, "text/html", "");
	});
	server.on("/data", [](){
		String message = "{";

		message += "\"pitch\": " + String(pitch) + ',';
		message += "\"roll\": " + String(roll) + ',';
		message += "\"accx\": " + String(accX) + ',';
		message += "\"accy\": " + String(accY) + ',';
		message += "\"accz\": " + String(accZ);
		message += "}";
		server.send(200, "application/json", message);
		yield();
	});
	server.onNotFound([]() {
		String message = "File Not Found\n\n";

		message += "URI: ";
		message += server.uri();
		message += "\nMethod: ";
		message += (server.method() == HTTP_GET)?"GET":"POST";
		message += "\nArguments: ";
		message += server.args();
		message += "\n";
		for (uint8_t i=0; i<server.args(); i++){
			message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
		}
		server.send(404, "text/plain", message);
		yield();
	});
	yield();
	server.begin();
	Serial.println("HTTP server started");
	pinMode(LED_BUILTIN, OUTPUT);
}

void loop()
{
	digitalWrite(LED_BUILTIN, HIGH);
	yield();
	acc.getPitchAndRollAverage(&pitch, &roll, &accX, &accY, &accZ, 25);
	Serial.print("Pitch: ");
	Serial.println(pitch);
	Serial.print("Roll:  ");
	Serial.println(roll);
	Serial.print("AccX:  ");
	Serial.println(accX);
	Serial.print("AccY:  ");
	Serial.println(accY);
	Serial.print("AccZ:  ");
	Serial.println(accZ);
	yield();
	server.handleClient();
	yield();
	digitalWrite(LED_BUILTIN, LOW);
	delay(200);
}

AccelerationSensor::AccelerationSensor() {
	mma = new Adafruit_MMA8451();
	if (!mma->begin(0x1C)) {
		while (1);
	}
	mma->setRange(MMA8451_RANGE_2_G);
	delay(500);
}

AccelerationSensor::~AccelerationSensor() {
	delete mma;
}

void AccelerationSensor::getPitchAndRoll(	double* pitch,
											double* roll,
											double* accX,
											double* accY,
											double* accZ) {
	sensors_event_t event;

	mma->read();
	mma->getEvent(&event);
	*roll 	= 0.00;
	*pitch 	= 0.00;
	*accX 	= 0.00;
	*accY 	= 0.00;
	*accZ 	= 0.00;

	double accelerationX = float(event.acceleration.x);
	double accelerationY = float(event.acceleration.y);
	double accelerationZ = float(event.acceleration.z);

	*accX 	= accelerationX;
	*accY 	= accelerationY;
	*accZ 	= accelerationZ;
	*roll 	= atan2(accelerationY , accelerationZ) * 57.3;
	*pitch 	= atan2((- (accelerationX)) , sqrt((accelerationY) * (accelerationY) + (accelerationZ) * (accelerationZ))) * 57.3;
}

void AccelerationSensor::getPitchAndRollAverage(double* pitch,
												double* roll,
												double* accX,
												double* accY,
												double* accZ,
												uint8_t samples){
	double pitchsample, rollsample, accXsample, accYsample, accZsample;

	*pitch 	= 0;
	*roll 	= 0;
	*accX 	= 0;
	*accY 	= 0;
	*accZ 	= 0;
	for(uint8_t j = 0; j < samples; j++) {
		this->getPitchAndRoll(&pitchsample, &rollsample, &accXsample, &accYsample, &accZsample);
		*pitch 	+= pitchsample;
		*roll 	+= rollsample;
		*accX	+= accXsample;
		*accY	+= accYsample;
		*accZ	+= accZsample;
	}
	*pitch 	= *pitch / (double)samples;
	*roll 	= *roll / (double)samples;
	*accX 	= *accX / (double)samples;
	*accY 	= *accY / (double)samples;
	*accZ 	= *accZ / (double)samples;
}

