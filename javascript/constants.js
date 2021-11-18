const constants = {
	// prices ---------------------------------------------------------------------
	price_dingo: 4000,
	price_colour : {
		"Yellow" : 0,
		"Black" : 1,
		"White" : 1,
		"Red" : 1,
		"Orange" : 1,
		"Navy Blue" : 1,
		"Olive Drab" : 1
	},
  price_computer : {
		"mini ITX, 9th gen i5" : 2,
		"mini ITX, 9th gen i7" : 3,
		"mini ITX, 9th gen i7, with GPU, Nvidea 3500" : 4,
		"Nvidea Xavier AGX" : 3,
		"Nvidea Xavier Nano" : 2
	},
  price_battery : {
		"Sealed Lead Acid" : 0,
		"Lithium" : 1
	},
	price_bay_1 : {
		"Empty" : 0,
		"Additional Battery | Sealed Lead Acid" : 1,
		"Additional Battery | Lithium" : 3,
		"Additional Computer | mini ITX, 9th gen i5" : 2,
		"Additional Computer | mini ITX, 9th gen i7" : 3,
		"Additional Computer | mini ITX, 9th gen i7, with GPU, Nvidea 3500" : 5,
		"Additional Computer | Nvidea Xavier AGX" : 3,
		"Additional Computer | Nvidea Xavier Nano" : 2
	},
	price_bay_2 : {
		"Empty" : 0,
		"Additional Battery | Sealed Lead Acid" : `400`,
		"Additional Battery | Lithium" : 3,
		"Additional Computer | mini ITX, 9th gen i5" : 1,
		"Additional Computer | mini ITX, 9th gen i7" : 2,
		"Additional Computer | mini ITX, 9th gen i7, with GPU, Nvidea 3500" : 5,
		"Additional Computer | Nvidea Xavier AGX" : 2,
		"Additional Computer | Nvidea Xavier Nano" : 1
	},
	price_attachment_1 : {
		"None" : 0,
		"3D Lidar | Velodyne, Puck, VLP-16" : 10,
		"2D Lidar | Hokuyo, UST-10" : 6,
		"IMU | LORD Microstrain, 3DM-GX5-25" : 8,
		"Camera | Intel, Realsense D435" : 1,
	},
	price_attachment_2 : {
		"None" : 0,
		"3D Lidar, Lower | Velodyne, Puck, VLP-16" : 10,
		"3D Lidar, Upper | Velodyne, Puck, VLP-16" : 10,
		"3D Lidar, Vertical | Velodyne, Puck, VLP-16" : 10,
		"2D Lidar, Lower | Hokuyo, UST-10" : 8,
		"2D Lidar, Upper | Hokuyo, UST-10" : 8,
		"IMU | LORD Microstrain, 3DM-GX5-25" : 6,
		"Manipulator | Kinova, Gen3" : 20
	},
	price_attachment_3 : {
		"None" : 0,
		"3D Lidar, Lower | Velodyne, Puck, VLP-16" : 10,
		"3D Lidar, Upper | Velodyne, Puck, VLP-16" : 10,
		"3D Lidar, Vertical | Velodyne, Puck, VLP-16" : 10,
		"2D Lidar, Lower | Hokuyo, UST-10" : 8,
		"2D Lidar, Upper | Hokuyo, UST-10" : 8,
		"IMU | LORD Microstrain, 3DM-GX5-25" : 6
	},
	price_attachment_4 : {
		"None" : 0,
		"3D Lidar | Velodyne, Puck, VLP-16" : 10,
		"2D Lidar | Hokuyo, UST-10" : 8,
		"IMU | LORD Microstrain, 3DM-GX5-25" : 6,
		"Camera | Intel, Realsense D435" : 1,
	},










	// lead times -----------------------------------------------------------------
	lead_time_dingo : 3,
	lead_time_colour : {
		"Yellow" : 0,
		"Black" : 7,
		"White" : 7,
		"Red" : 7,
		"Orange" : 7,
		"Navy Blue" : 7,
		"Olive Drab" : 7
	},
	lead_time_computer : {
		"mini ITX, 9th gen i5" : 3,
		"mini ITX, 9th gen i7" : 3,
		"mini ITX, 9th gen i7, with GPU, Nvidea 3500" : 6,
		"Nvidea Xavier AGX" : 3,
		"Nvidea Xavier Nano" : 3
	},
	lead_time_battery : {
		"Sealed Lead Acid" : 0,
		"Lithium" : 0
	},
	lead_time_bay_1 : {
		"Empty" : 0,
		"Additional Battery | Sealed Lead Acid" : 0,
		"Additional Battery | Lithium" : 0,
		"Additional Computer | mini ITX, 9th gen i5" : 3,
		"Additional Computer | mini ITX, 9th gen i7" : 3,
		"Additional Computer | mini ITX, 9th gen i7, with GPU, Nvidea 3500" : 6,
		"Additional Computer | Nvidea Xavier AGX" : 3,
		"Additional Computer | Nvidea Xavier Nano" : 3
	},
	lead_time_bay_2 : {
		"Empty" : 0,
		"Additional Battery | Sealed Lead Acid" : 0,
		"Additional Battery | Lithium" : 0,
		"Additional Computer | mini ITX, 9th gen i5" : 3,
		"Additional Computer | mini ITX, 9th gen i7" : 3,
		"Additional Computer | mini ITX, 9th gen i7, with GPU, Nvidea 3500" : 6,
		"Additional Computer | Nvidea Xavier AGX" : 3,
		"Additional Computer | Nvidea Xavier Nano" : 3
	},
	lead_time_attachment_1 : {
		"None" : 0,
		"3D Lidar | Velodyne, Puck, VLP-16" : 0,
		"2D Lidar | Hokuyo, UST-10" : 4,
		"IMU | LORD Microstrain, 3DM-GX5-25" : 0,
		"Camera | Intel, Realsense D435" : 0
	},
	lead_time_attachment_2 : {
		"None" : 0,
		"3D Lidar, Lower | Velodyne, Puck, VLP-16" : 0,
		"3D Lidar, Upper | Velodyne, Puck, VLP-16" : 0,
		"3D Lidar, Vertical | Velodyne, Puck, VLP-16" : 0,
		"2D Lidar, Lower | Hokuyo, UST-10" : 4,
		"2D Lidar, Upper | Hokuyo, UST-10" : 4,
		"IMU | LORD Microstrain, 3DM-GX5-25" : 0,
		"Manipulator | Kinova, Gen3" : 8
	},
	lead_time_attachment_3 : {
		"None" : 0,
		"3D Lidar, Lower | Velodyne, Puck, VLP-16" : 0,
		"3D Lidar, Upper | Velodyne, Puck, VLP-16" : 0,
		"3D Lidar, Vertical | Velodyne, Puck, VLP-16" : 0,
		"2D Lidar, Lower | Hokuyo, UST-10" : 4,
		"2D Lidar, Upper | Hokuyo, UST-10" : 4,
		"IMU | LORD Microstrain, 3DM-GX5-25" : 0
	},
	lead_time_attachment_4 : {
		"None" : 0,
		"3D Lidar | Velodyne, Puck, VLP-16" : 0,
		"2D Lidar | Hokuyo, UST-10" : 4,
		"IMU | LORD Microstrain, 3DM-GX5-25" : 0,
		"Camera | Intel, Realsense D435" : 0
	},









  // Text decriptions for PDF quote ---------------------------------------------
	// Text decriptions for PDF quote - Dingo
	text_dingo : [
		//                                                                end of line|
		"Dingo-O indoor robotic platform",
		"Specifications: An omnidirectional drive mobile robot, Dingo ",
		"includes user power breakouts for 5 V, 12 V, and unregulated 12 V ",
		"battery voltage. Dingo has a maximum speed of 1.6 m/s with a ",
		"payload of 20 kg. The base platform mass includes a computer and a ",
		"single battery, and does not addect the 20 kg allowable payload. ",
		"Dingo runs on ROS Melodic and Ubuntu Server 18-04. Dingo includes ",
		"user-accessible ethernet, wifi, and bluetooth. ",
		" "
	],
	// Text decriptions for PDF quote - Panel Colour
  text_colour : {
    "Yellow" : [
		  //                                                                end of line|
		  "Colour, side panels - Yellow",
		  "Specifications: The Dingo's side panels will be coated yellow.",
		  "Note: The default colour is yellow. Optional colours are available",
		  "at an increased price and lead-time.",
		  " ",
		  " ",
		  " ",
		  " ",
		  " "
	  ],
    "Black" : [
		  //                                                                end of line|
		  "Colour, side panels - Black",
      "Specifications: The Dingo's side panels will be coated black.",
      "Note: The default colour is yellow. Optional colours are available",
      "at an increased price and lead-time.",
      " ",
      " ",
      " ",
      " ",
      " "
	  ],
    "White" : [
	  	//                                                                end of line|
		  "Colour, side panels - White",
		  "Specifications: The Dingo's side panels will be coated white.",
		  "Note: The default colour is yellow. Optional colours are available",
		  "at an increased price and lead-time.",
		  " ",
		  " ",
		  " ",
		  " ",
		  " "
	  ],
    "Red" : [
		  //                                                                end of line|
		  "Colour, side panels - Red",
		  "Specifications: The Dingo's side panels will be coated red.",
		  "Note: The default colour is yellow. Optional colours are available",
		  "at an increased price and lead-time.",
		  " ",
		  " ",
		  " ",
		  " ",
		  " "
	  ],
    "Orange" : [
  		//                                                                end of line|
	  	"Colour, side panels - Orange",
		  "Specifications: The Dingo's side panels will be coated orange.",
		  "Note: The default colour is yellow. Optional colours are available",
		  "at an increased price and lead-time.",
		  " ",
	  	" ",
  		" ",
  		" ",
  		" "
  	],
    "Navy Blue" : [
	  	//                                                                end of line|
	  	"Colour, side panels - Navy Blue",
		  "Specifications: The Dingo's side panels will be coated navy blue.",
		  "Note: The default colour is yellow. Optional colours are available",
		  "at an increased price and lead-time.",
		  " ",
		  " ",
		  " ",
		  " ",
		  " "
  	],
    "Olive Drab" : [
	  	//                                                                end of line|
	  	"Colour, side panels - Olive Drab",
	  	"Specifications: The Dingo's side panels will be coated olive drab.",
	  	"Note: The default colour is yellow. Optional colours are available",
	  	"at an increased price and lead-time.",
	  	" ",
	  	" ",
	  	" ",
	  	" ",
	  	" "
  	]
	},
	// Text decriptions for PDF quote - Computer
  text_computer : {
    "mini ITX, 9th gen i5" : [
		  //                                                                end of line|
	  	"Computer - mini ITX, 9th gen i5",
	  	"Specifications: ",
	  	" ",
	  	" ",
	  	" ",
	  	" ",
	  	" ",
	  	" ",
	  	" "
	  ],
    "mini ITX, 9th gen i7" : [
	  	//                                                                end of line|
	  	"Computer - mini ITX, 9th gen i7 ",
	  	"Specifications: ",
	  	" ",
	  	" ",
	  	" ",
	  	" ",
	  	" ",
	    " ",
	    " "
	  ],
    "mini ITX, 9th gen i7, with GPU, Nvidea 3500" : [
	  	//                                                                end of line|
	  	"Computer - mini ITX, 9th gen i7, with GPU, Nvidea 3500",
	  	"Specifications: ",
	  	" ",
	  	" ",
	  	" ",
	  	" ",
	  	" ",
	  	" ",
	  	" "
	  ],
    "Nvidea Xavier AGX" : [
	  	//                                                                end of line|
	  	"Computer - Nvidea Xavier AGX",
	  	"Specifications: ",
	  	" ",
	  	" ",
	  	" ",
	  	" ",
	  	" ",
	  	" ",
	  	" "
	  ],
    "Nvidea Xavier Nano" : [
	  	//                                                                end of line|
	  	"Computer - Nvidea Xavier Nano ",
	  	"Specifications: ",
	  	" ",
	  	" ",
	  	" ",
	  	" ",
	  	" ",
	  	" ",
	  	" "
  	]
  },
	// Text decriptions for PDF quote - Battery
  text_battery : {
    "Sealed Lead Acid" : [
	  	//                                                                end of line|
	  	"Battery - Sealed Lead Acid",
	  	"Specifications: ",
	  	" ",
	  	" ",
	  	" ",
	  	" ",
	  	" ",
	  	" ",
	  	" "
	  ],
    "Lithium" : [
	  	//                                                                end of line|
	  	"Battery - Lithium",
	  	"Specifications: ",
	  	" ",
	  	" ",
	  	" ",
	  	" ",
	  	" ",
	  	" ",
	  	" "
	  ]
  },
	// Text descriptions for PDF quote - Internal Bay 1
	text_bay_1 : {
		"Empty" : [
			//                                                                end of line|
			"Internal Bay 1 - Empty",
			"Specifications: This section of the robot will be left empty.",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" "
		],
		"Additional Battery | Sealed Lead Acid" : [
			//                                                                end of line|
			"Internal Bay 1 - Additional Sealed Lead Acid Battery",
			"Specifications: An additional SLA battery will be added to Internal Bay 1.",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" "
		],
		"Additional Battery | Lithium" : [
			//                                                                end of line|
			"Internal Bay 1 - Additional Lithium Battery",
			"Specifications: An additional lithium battery will be added to Internal Bay 1",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" "
		],
		"Additional Computer | mini ITX, 9th gen i5" : [
			//                                                                end of line|
			"Internal Bay 1 - Additional Computer mini ITX, 9th gen i5",
			"Specifications: An additional computer will be added to Dingo.",
			"The main computer will be the ROS Master, with additional computers",
			"subscribing as clients.",
			" ",
			" ",
			" ",
			" ",
			" "
		],
		"Additional Computer | mini ITX, 9th gen i7" : [
			//                                                                end of line|
			"Internal Bay 1 - Additional Computer mini ITX, 9th gen i7",
			"Specifications: An additional computer will be added to Dingo.",
			"The main computer will be the ROS Master, with additional computers",
			"subscribing as clients.",
			" ",
			" ",
			" ",
			" ",
			" "
		],
		"Additional Computer | mini ITX, 9th gen i7, with GPU, Nvidea 3500" : [
			//                                                                end of line|
			"Internal Bay 1 - Additional Computer mini ITX, 9th gen i7 + Nvidea 3500",
			"Specifications: An additional computer and GPU will be added to Dingo.",
			"The main computer will be the ROS Master, with additional computers",
			"subscribing as clients.",
			" ",
			" ",
			" ",
			" ",
			" "
		],
		"Additional Computer | Nvidea Xavier AGX" : [
			//                                                                end of line|
			"Internal Bay 1 - Additional Computer, Nvidea Xavier AGX",
			"Specifications: An additional computer will be added to Dingo.",
			"The main computer will be the ROS Master, with additional computers",
			"subscribing as clients.",
			" ",
			" ",
			" ",
			" ",
			" "
		],
		"Additional Computer | Nvidea Xavier Nano" : [
			//                                                                end of line|
			"Internal Bay 1 - Additional Computer, Nvidea Xavier Nano",
			"Specifications: An additional computer will be added to Dingo.",
			"The main computer will be the ROS Master, with additional computers",
			"subscribing as clients.",
			" ",
			" ",
			" ",
			" ",
			" "
		]
	},
	// Text descriptions for PDF quote - Internal Bay 2
	text_bay_2 : {
		"Empty" : [
			//                                                                end of line|
			"Internal Bay 2 - Empty",
			"Specifications: This section of the robot will be left empty.",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" "
		],
		"Additional Battery | Sealed Lead Acid" : [
			//                                                                end of line|
			"Internal Bay 2 - Additional Sealed Lead Acid Battery",
			"Specifications: An additional SLA battery will be added to Internal Bay 1.",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" "
		],
		"Additional Battery | Lithium" : [
			//                                                                end of line|
			"Internal Bay 2 - Additional Lithium Battery",
			"Specifications: An additional lithium battery will be added to",
			"Internal Bay 1.",
			" ",
			" ",
			" ",
			" ",
			" ",
			" "
		],
		"Additional Computer | mini ITX, 9th gen i5" : [
			//                                                                end of line|
			"Internal Bay 2 - Additional Computer mini ITX, 9th gen i5",
			"Specifications: An additional computer will be added to Dingo.",
			"The main computer will be the ROS Master, with additional computers",
			"subscribing as clients.",
			" ",
			" ",
			" ",
			" ",
			" "
		],
		"Additional Computer | mini ITX, 9th gen i7" : [
			//                                                                end of line|
			"Internal Bay 2 - Additional Computer mini ITX, 9th gen i7",
			"Specifications: An additional computer will be added to Dingo.",
			"The main computer will be the ROS Master, with additional computers",
			"subscribing as clients.",
			" ",
			" ",
			" ",
			" ",
			" "
		],
		"Additional Computer | mini ITX, 9th gen i7, with GPU, Nvidea 3500" : [
			//                                                                end of line|
			"Internal Bay 2 - Additional Computer mini ITX, 9th gen i7 + Nvidea 3500",
			"Specifications: An additional computer and GPU will be added to Dingo.",
			"The main computer will be the ROS Master, with additional computers",
			"subscribing as clients.",
			" ",
			" ",
			" ",
			" ",
			" "
		],
		"Additional Computer | Nvidea Xavier AGX" : [
			//                                                                end of line|
			"Internal Bay 2 - Additional Computer, Nvidea Xavier AGX",
			"Specifications: An additional computer will be added to Dingo.",
			"The main computer will be the ROS Master, with additional computers",
			"subscribing as clients.",
			" ",
			" ",
			" ",
			" ",
			" "
		],
		"Additional Computer | Nvidea Xavier Nano" : [
			//                                                                end of line|
			"Internal Bay 2 - Additional Computer, Nvidea Xavier Nano",
			"Specifications: An additional computer will be added to Dingo.",
			"The main computer will be the ROS Master, with additional computers",
			"subscribing as clients.",
			" ",
			" ",
			" ",
			" ",
			" "
		]
	},
	// Text descriptions for PDF quote - Attachment 1
	text_attachment_1 : {
		"None" : [
			//                                                                end of line|
			"Attachment 1 - None",
			"Specifications: This section of the robot will not have any components",
			"integrated on it. The standard Dingo bolt pattern will still be available",
			"for future integrations. (4X M5 screws, 80 X 80 pattern)",
			" ",
			" ",
			" ",
			" ",
			" "
		],
		"3D Lidar | Velodyne, Puck, VLP-16" : [
			//                                                                end of line|
			"Attachment 1 - Velodyne, Puck, VLP-16",
			"Specifications: The Dingo will inlude a Velodyne VLP-16 on the front",
			"attachment area. The Velodyne will be connected to 12 V regulated power,",
			"and data will be transmitted through ethernet to the main computer.",
			"This also includes the brackets, fasteners, and cable to connect the Velodyne.",
			"The ROS sensor drivers will be added to the main computer, with data visible",
			"in Rviz. These ROS drivers are developed by the original manufacturer,",
			"not Clearpath Robotics.",
			" "
		],
		"2D Lidar | Hokuyo, UST-10" : [
			//                                                                end of line|
			"Attachment 1 - Hokuyo, UST-10",
			"Specifications: The Dingo will inlude a Hokuyo UST-10 on the front",
			"attachment area. The Hokuyo will be connected to 12 V regulated power, and",
			"data will be transmitted through ethernet to the main computer. This also",
			"includes the brackets, fasteners, and cable to connect the Hokuyo. The ROS",
			"sensor drivers will be added to the main computer, with data visible in Rviz.",
			"These ROS drivers are developed by the original manufacturer,",
			"not Clearpath Robotics.",
			" "
		],
		"IMU | LORD Microstrain, 3DM-GX5-25" : [
			//                                                                end of line|
			"Attachment 1 - Microstrain, 3DM-GX5-25",
			"Specifications: The Dingo will inlude a Microstrain 3DM-GX5-25 on the",
			"front attachment area. The Microstrain will be connected to the main computer",
			"with USB 2.0 type A. This USB connection will transmit data, and power the",
			"Microstrain. This also includes the brackets, fasteners, and cable to connect",
			"the Microstrain. The ROS sensor drivers will be added to the main computer,",
			"with data visible in Rviz. These ROS drivers are developed by the original",
			"manufacturer, not Clearpath Robotics.",
			" "
		],
		"Camera | Intel, Realsense D435" : [
			//                                                                end of line|
			"Attachment 1 - Intel, Realsense D435",
			"Specifications: The Dingo will inlude a Realsense D435 on the front",
			"attachment area. The Realsense will be connected to the main computer with",
			"USB 3.1 type A. This USB connection will transmit data, and power the",
			"Realsense. This also includes the brackets, fasteners, and cable to connect",
			"the Realsense. The ROS sensor drivers will be added to the main computer,",
			"with data visible in Rviz. These ROS drivers are developed by the original",
			"manufacturer, not Clearpath Robotics.",
			" "
		]
	},
	// Text descriptions for PDF quote - Attachment 2
	text_attachment_2 : {
		"None" : [
			//                                                                end of line|
			"Attachment 2 - None",
			"Specifications: This section of the robot will not have any components",
			"integrated on it. The standard Dingo bolt pattern will still be available",
			"for future integrations. (4X M5 screws, 80 X 80 pattern)",
			" ",
			" ",
			" ",
			" ",
			" "
		],
		"3D Lidar, Lower | Velodyne, Puck, VLP-16" : [
			//                                                                end of line|
			"Attachment 2 - Velodyne, Lower, Puck, VLP-16",
			"Specifications: The Dingo will inlude a Velodyne VLP-16 on the centre-front",
			"attachment area. The Velodyne will be connected to 12 V regulated power,",
			"and data will be transmitted through ethernet to the main computer.",
			"This also includes the brackets, fasteners, and cable to connect the Velodyne.",
			"The ROS sensor drivers will be added to the main computer, with data visible",
			"in Rviz. These ROS drivers are developed by the original manufacturer,",
			"not Clearpath Robotics.",
			" "
		],
		"3D Lidar, Upper | Velodyne, Puck, VLP-16" : [
			//                                                                end of line|
			"Attachment 2 - Velodyne, Upper, Puck, VLP-16",
			"Specifications: The Dingo will inlude a Velodyne VLP-16 on the centre-front",
			"attachment area. The Velodyne will be connected to 12 V regulated power,",
			"and data will be transmitted through ethernet to the main computer.",
			"This also includes the brackets, fasteners, and cable to connect the Velodyne.",
			"The ROS sensor drivers will be added to the main computer, with data visible",
			"in Rviz. These ROS drivers are developed by the original manufacturer,",
			"not Clearpath Robotics.",
			" "
		],
		"3D Lidar, Vertical | Velodyne, Puck, VLP-16" : [
			//                                                                end of line|
			"Attachment 2 - Velodyne, Vertical, Puck, VLP-16",
			"Specifications: The Dingo will inlude a Velodyne VLP-16 on the centre-front",
			"attachment area. The Velodyne will be connected to 12 V regulated power,",
			"and data will be transmitted through ethernet to the main computer.",
			"This also includes the brackets, fasteners, and cable to connect the Velodyne.",
			"The ROS sensor drivers will be added to the main computer, with data visible",
			"in Rviz. These ROS drivers are developed by the original manufacturer,",
			"not Clearpath Robotics.",
			" "
		],
		"2D Lidar, Lower | Hokuyo, UST-10" : [
			//                                                                end of line|
			"Attachment 2 - Hokuyo, Lower, UST-10",
			"Specifications: The Dingo will inlude a Hokuyo UST-10 on the centre-front",
			"attachment area. The Hokuyo will be connected to 12 V regulated power, and",
			"data will be transmitted through ethernet to the main computer. This also",
			"includes the brackets, fasteners, and cable to connect the Hokuyo. The ROS",
			"sensor drivers will be added to the main computer, with data visible in Rviz.",
			"These ROS drivers are developed by the original manufacturer,",
			"not Clearpath Robotics.",
			" "
		],
		"2D Lidar, Upper | Hokuyo, UST-10" : [
			//                                                                end of line|
		"Attachment 2 - Hokuyo, Upper, UST-10",
		"Specifications: The Dingo will inlude a Hokuyo UST-10 on the centre-front",
			"attachment area. The Hokuyo will be connected to 12 V regulated power, and",
			"data will be transmitted through ethernet to the main computer. This also",
			"includes the brackets, fasteners, and cable to connect the Hokuyo. The ROS",
			"sensor drivers will be added to the main computer, with data visible in Rviz.",
			"These ROS drivers are developed by the original manufacturer,",
			"not Clearpath Robotics.",
			" "
		],
		"IMU | LORD Microstrain, 3DM-GX5-25" : [
			//                                                                end of line|
			"Attachment 2 - Microstrain, 3DM-GX5-25",
			"Specifications: The Dingo will inlude a Microstrain 3DM-GX5-25 on the",
			"centre-rear attachment area. The Microstrain will be connected to the main",
			"computer with USB 2.0 type A. This USB connection will transmit data, and",
			"power the Microstrain. This also includes the brackets, fasteners, and cable",
			"to connect the Microstrain. The ROS sensor drivers will be added to the main",
			"computer, with data visible in Rviz. These ROS drivers are developed by the",
			"original manufacturer, not Clearpath Robotics.",
			" "
		],
		"Manipulator | Kinova, Gen3" : [
			//                                                                end of line|
			"Attachment 1 - Kinova, Gen3 Lite",
			"Specifications: The Dingo will inlude a Kinova Gen3 Lite on the front",
			"attachment area. The Kinova will be connected to the main computer with USB",
			"or Ethernet based on the main computer selection. The Kinova will be powered",
			"from a 24 VDC supply. This also includes the power supply, brackets,",
			"fasteners, and cables to connect the Kinova. The ROS sensor drivers will be",
			"added to the main computer, with data visible in Rviz. These ROS drivers are",
			"developed by the original manufacturer, not Clearpath Robotics.",
			" "
		]
	},
	// Text descriptions for PDF quote - Attachment 3
	text_attachment_3 : {
		"None" : [
			//                                                                end of line|
			"Attachment 3 - None",
			"Specifications: This section of the robot will not have any components",
			"integrated on it. The standard Dingo bolt pattern will still be available",
			"for future integrations. (4X M5 screws, 80 X 80 pattern)",
			" ",
			" ",
			" ",
			" ",
			" "
		],
		"3D Lidar, Lower | Velodyne, Puck, VLP-16" : [
			//                                                                end of line|
			"Attachment 3 - Velodyne, Lower, Puck, VLP-16",
			"Specifications: The Dingo will inlude a Velodyne VLP-16 on the centre-rear",
			"attachment area. The Velodyne will be connected to 12 V regulated power,",
			"and data will be transmitted through ethernet to the main computer.",
			"This also includes the brackets, fasteners, and cable to connect the Velodyne.",
			"The ROS sensor drivers will be added to the main computer, with data visible",
			"in Rviz. These ROS drivers are developed by the original manufacturer,",
			"not Clearpath Robotics.",
			" "
		],
		"3D Lidar, Upper | Velodyne, Puck, VLP-16" : [
			//                                                                end of line|
			"Attachment 3 - Velodyne, Upper, Puck, VLP-16",
			"Specifications: The Dingo will inlude a Velodyne VLP-16 on the centre-rear",
			"attachment area. The Velodyne will be connected to 12 V regulated power,",
			"and data will be transmitted through ethernet to the main computer.",
			"This also includes the brackets, fasteners, and cable to connect the Velodyne.",
			"The ROS sensor drivers will be added to the main computer, with data visible",
			"in Rviz. These ROS drivers are developed by the original manufacturer,",
			"not Clearpath Robotics.",
			" "
		],
		"3D Lidar, Vertical | Velodyne, Puck, VLP-16" : [
			//                                                                end of line|
			"Attachment 3 - Velodyne, Vertical, Puck, VLP-16",
			"Specifications: The Dingo will inlude a Velodyne VLP-16 on the centre-rear",
			"attachment area. The Velodyne will be connected to 12 V regulated power,",
			"and data will be transmitted through ethernet to the main computer.",
			"This also includes the brackets, fasteners, and cable to connect the Velodyne.",
			"The ROS sensor drivers will be added to the main computer, with data visible",
			"in Rviz. These ROS drivers are developed by the original manufacturer,",
			"not Clearpath Robotics.",
			" "
		],
		"2D Lidar, Lower | Hokuyo, UST-10" : [
			//                                                                end of line|
		"Attachment 3 - Hokuyo, Lower, UST-10",
		"Specifications: The Dingo will inlude a Hokuyo UST-10 on the centre-rear",
			"attachment area. The Hokuyo will be connected to 12 V regulated power, and",
			"data will be transmitted through ethernet to the main computer. This also",
			"includes the brackets, fasteners, and cable to connect the Hokuyo. The ROS",
			"sensor drivers will be added to the main computer, with data visible in Rviz.",
			"These ROS drivers are developed by the original manufacturer,",
			"not Clearpath Robotics.",
			" "
		],
		"2D Lidar, Upper | Hokuyo, UST-10" : [
			//                                                                end of line|
			"Attachment 2 - Microstrain, 3DM-GX5-25",
			"Specifications: The Dingo will inlude a Microstrain 3DM-GX5-25 on the",
			"centre-rear attachment area. The Microstrain will be connected to the main",
			"computer with USB 2.0 type A. This USB connection will transmit data, and",
			"power the Microstrain. This also includes the brackets, fasteners, and cable",
			"to connect the Microstrain. The ROS sensor drivers will be added to the main",
			"computer, with data visible in Rviz. These ROS drivers are developed by the",
			"original manufacturer, not Clearpath Robotics.",
			" "
		],
		"IMU | LORD Microstrain, 3DM-GX5-25" : [
			//                                                                end of line|
			"Attachment 3 - Microstrain, 3DM-GX5-25",
			"Specifications: The Dingo will inlude a Microstrain 3DM-GX5-25 on the",
			"centre-rear attachment area. The Microstrain will be connected to the main computer",
			"with USB 2.0 type A. This USB connection will transmit data, and power the",
			"Microstrain. This also includes the brackets, fasteners, and cable to connect",
			"the Microstrain. The ROS sensor drivers will be added to the main computer,",
			"with data visible in Rviz. These ROS drivers are developed by the original",
			"manufacturer, not Clearpath Robotics.",
			" "
		]
	},
	// Text descriptions for PDF quote - Attachment 4
	text_attachment_4 : {
		"None" : [
			//                                                                end of line|
			"Attachment 4 - None",
			"Specifications: This section of the robot will not have any components",
			"integrated on it. The standard Dingo bolt pattern will still be available",
			"for future integrations. (4X M5 screws, 80 X 80 pattern)",
			" ",
			" ",
			" ",
			" ",
			" "
		],
		"3D Lidar | Velodyne, Puck, VLP-16" : [
			//                                                                end of line|
			"Attachment 4 - Velodyne, Puck, VLP-16",
			"Specifications: The Dingo will inlude a Velodyne VLP-16 on the rear",
			"attachment area. The Velodyne will be connected to 12 V regulated power,",
			"and data will be transmitted through ethernet to the main computer.",
			"This also includes the brackets, fasteners, and cable to connect the Velodyne.",
			"The ROS sensor drivers will be added to the main computer, with data visible",
			"in Rviz. These ROS drivers are developed by the original manufacturer,",
			"not Clearpath Robotics.",
			" "
		],
		"2D Lidar | Hokuyo, UST-10" : [
			//                                                                end of line|
		"Attachment 4 - Hokuyo, UST-10",
			"Specifications: The Dingo will inlude a Hokuyo UST-10 on the rear",
			"attachment area. The Hokuyo will be connected to 12 V regulated power, and",
			"data will be transmitted through ethernet to the main computer. This also",
			"includes the brackets, fasteners, and cable to connect the Hokuyo. The ROS",
			"sensor drivers will be added to the main computer, with data visible in Rviz.",
			"These ROS drivers are developed by the original manufacturer,",
			"not Clearpath Robotics.",
			" "
	],
		"IMU | LORD Microstrain, 3DM-GX5-25" : [
			//                                                                end of line|
			"Attachment 4 - Microstrain, 3DM-GX5-25",
			"Specifications: The Dingo will inlude a Microstrain 3DM-GX5-25 on the",
			"rear attachment area. The Microstrain will be connected to the main computer",
			"with USB 2.0 type A. This USB connection will transmit data, and power the",
			"Microstrain. This also includes the brackets, fasteners, and cable to connect",
			"the Microstrain. The ROS sensor drivers will be added to the main computer,",
			"with data visible in Rviz. These ROS drivers are developed by the original",
			"manufacturer, not Clearpath Robotics.",
			" "
		],
		"Camera | Intel, Realsense D435" : [
			//                                                                end of line|
			"Attachment 4 - Intel, Realsense D435",
			"Specifications: The Dingo will inlude a Realsense D435 on the rear",
			"attachment area. The Realsense will be connected to the main computer with",
			"USB 3.1 type A. This USB connection will transmit data, and power the",
			"Realsense. This also includes the brackets, fasteners, and cable to connect",
			"the Realsense. The ROS sensor drivers will be added to the main computer,",
			"with data visible in Rviz. These ROS drivers are developed by the original",
			"manufacturer, not Clearpath Robotics.",
			" "
		]
	}
}

export { constants };