export const dataRanges = [
    {
        id: "3ndn28nhBGGHDS867392h2nsdskaja",
        title: "Number of trenings to reach the target",
        subtile:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum rem perferendis excepturi dignissimos repellat magni incidunt! Aliquam aperiam nulla sint animi fuga? Voluptatibus tenetur inventore consequuntur eligendi aperiam sint veniam.",
        paramRange: {
            min: 0,
            max: 90,
            title: "Trenings",
            subtile: "Setting the number of trenings",
            metering: "trenings",
            innerBtn: "Save result",
        },
        targetProgress: {
            param: "trenings",
        },
        type: "trenings"
    },
    {
        id: "Kksjsds783932ghHGSH78393",
        title: "Number of days to reach the target",
        subtile:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum rem perferendis excepturi dignissimos repellat magni incidunt! Aliquam aperiam nulla sint animi fuga? Voluptatibus tenetur inventore consequuntur eligendi aperiam sint veniam.",
        paramRange: {
            min: 0,
            max: 365,
            title: "Days",
            subtile: "Setting the number of days",
            metering: "days",
            innerBtn: "Save result",
        },
        targetProgress: {
            param: "days",
        },
        type: "time"
    },
    {
        id: "K-n34lkds934934mKJdsl54nnjg",
        title: "Weigth target",
        subtile:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum rem perferendis excepturi dignissimos repellat magni incidunt! Aliquam aperiam nulla sint animi fuga? Voluptatibus tenetur inventore consequuntur eligendi aperiam sint veniam.",
        paramRange: {
            min: 0,
            max: 500,
            title: "Weigth",
            subtile: "Setting the target weigth",
            metering: "kg",
            innerBtn: "Save result",
        },
        targetProgress: {
            param: "kg",
        },
        type: "weigth"
    },
];

const dataTragetWeigth = {
    "selectedExercise": {
        "id": "14TyL00dn-21307XMG_5g5d7G7G_Zp",
        "name": "Shrugs",
        "img": [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThSfVMp65XvyxJXG1mx6nmTJqFtyabjVh_CQ&usqp=CAU"
        ],
        "descr": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum placeat culpa, at eum maiores inventore mollitia amet ullam rem fuga laboriosam necessitatibus sit? Nesciunt quos alias ipsam quasi dicta hic. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum placeat culpa, at eum maiores inventore mollitia amet ullam rem fuga laboriosam necessitatibus sit? Nesciunt quos alias ipsam quasi dicta hic.",
        "workingParts": ["trapezoid"],
        "typeOfExercise": "base"
    },
    "weight": {
        "targetWeigth": 120,
        "parametrs": {
          "target": 120,
          "remainder": 55,
          "valueAbsolute": 65,
          "valuePercent": 54.17,
          "paramProgress": "kg"
        }
    },
    "someTrenings": {
      "trenings": 20,
      "parametrs": {
        "target": 20,
        "remainder": 19,
        "valueAbsolute": 1,
        "valuePercent": 5,
        "paramProgress": "trenings"
      }
    },
    "timeToTarget": {
        "start": 1670883010844,
        "end": 1678659010844,
        "days": 90,
        "date": {"start": "12.13.2023", "end": "03.12.2023"},
        "parametrs": {
          "target": 90,
          "remainder": 72,
          "valueAbsolute": 18,
          "valuePercent": 20,
          "paramProgress": "days"
        }
    },
    "targetAchievement": [
        {
            "result": 65,
            "id": "fd7j3jj7hsdjskskdgJksdHHsg"
        }
    ]
}