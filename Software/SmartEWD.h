#ifndef _ESPTest_H_
#define _ESPTest_H_

#include "Arduino.h"
#include <SPI.h>
#include <Wire.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include "Adafruit_Sensor.h"
#include "Adafruit_MMA8451.h"

class AccelerationSensor {
public:
	AccelerationSensor();
	virtual ~AccelerationSensor();
public:
	void getPitchAndRoll(	double* pitch,
							double* roll,
							double* accX,
							double* accY,
							double* accZ);
	void getPitchAndRollAverage(double* pitch,
								double* roll,
								double* accX,
								double* accY,
								double* accZ,
								uint8_t samples = 20);
private:
	Adafruit_MMA8451* mma =  NULL;
};

#endif /* _ESPTest_H_ */
