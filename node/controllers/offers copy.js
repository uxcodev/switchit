`
The document below is from a mongodb collection called offers. Write me a node controller that gets the status of each user, and adds the totals for each status as new property in the offers object."

{
  "_id": {
    "$oid": "642ef5f659bb48b6163a34c6"
  },
  "offer_details": {
    "name": "My offer",
      "status": "new",
        "start_date": "01/01/24",
          "expiry_date": "01/01/25",
            "term": "1 year",
              "details": "Get a free donut"
  },
  "criteria": {
    "mortgage_price_min": 0,
      "mortgage_price_max": 10,
        "mortgage_service_min": 0,
          "mortgage_service_max": 10,
            "mortgage_features_min": 0,
              "mortgage_features_max": 10,
                "insurance_price_min": 0,
                  "insurance_price_max": 10,
                    "insurance_service_min": 0,
                      "insurance_service_max": 10,
                        "insurance_features_min": 0,
                          "insurance_features_max": 10,
                            "broadband_price_min": 0,
                              "broadband_price_max": 10,
                                "broadband_service_min": 0,
                                  "broadband_service_max": 10,
                                    "broadband_features_min": 0,
                                      "broadband_features_max": 10
  },
  "offer": {
    "mortgage": {
      "rate": 3.45,
        "rate_type": "Fixed",
          "one_time_cost": 0,
            "monthly_cost": 1117,
              "downpayment": 25
    },
    "insurance": {
      "premium": 150,
        "injury_liability": 300000,
          "property_liability": 100000,
            "collision_deductible": 1000,
              "comprehensive_deductible": 500
    }
  },
  "users": [
    {
      "leadId": {
        "$oid": "6410b8e85440228dd7a4ee48"
      },
      "status": "won",
      "reason": null,
      "viewed": false,
      "_id": {
        "$oid": "642ef5f659bb48b6163a34c7"
      }
    },
    {
      "leadId": {
        "$oid": "6410b8e85440228dd7a4ee41"
      },
      "status": "lost",
      "reason": null,
      "viewed": false,
      "_id": {
        "$oid": "642ef5f659bb48b6163a34c1"
      }
    },
    {
      "leadId": {
        "$oid": "6410b8e85440228dd7a4ee42"
      },
      "status": "pending",
      "reason": null,
      "viewed": false,
      "_id": {
        "$oid": "642ef5f659bb48b6163a34c2"
      }
    },
  ],
    "__v": 0
}
`