const express = require('express')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());
app.post('/api',(req,res) => {
    const parameters = req.body

    const nitr = parameters.nitr
    const phos = parameters.phos
    const pota = parameters.pota

    const SYT_A = 70;
    const SYT_P = 50;
    const SYT_S = 40;

    // const recomm_obj = calculations(8.33,203.04,117.9,40,50,70)
    const recomm_obj = calculations(phos,pota,nitr,SYT_S,SYT_P,SYT_A)
    res.json(recomm_obj)
})

app.listen(5000, () =>{
    console.log('server')
})

function calculations(phos,pota,nitr,SYT_S,SYT_P,SYT_A){
        nitr_A=(4.39*SYT_A)-(1.56*nitr)
        nitr_P=(4.76*SYT_P)-(1.34*nitr)        
        nitr_S=(4.76*SYT_S)-(1.34*nitr)               
        phos_A=(1.24*SYT_A)-(1.55*phos)        
        phos_P=(1.24*SYT_P)-(1.55*phos)        
        phos_S=(1.24*SYT_S)-(1.55*phos)        
        pota_A=(2.73*SYT_A)-(0.21*pota)        
        pota_P=(2.73*SYT_P)-(0.21*pota)        
        pota_S=(2.73*SYT_S)-(0.21*pota)

        // Recommendations combination 1 
       
        c1_DAP_TA1_A=(phos_A*100)/46
        c1_DAP_TA2_A=(phos_A*100)/46
        c1_DAP_TA1_P=(phos_P*100)/46
        c1_DAP_TA2_P=(phos_P*100)/46
        c1_DAP_TA1_S=(phos_S*100)/46
        c1_DAP_TA2_S=(phos_S*100)/46

        // MOP Adsali

        c1_MOP_TA1_A=(pota_A*100)/60
        c1_MOP_TA2_A=(c1_MOP_TA1_A*0.1)
        c1_MOP_TA3_A=(c1_MOP_TA1_A*0.2)
        c1_MOP_TA4_A=(c1_MOP_TA1_A*0.2)
        c1_MOP_TA5_A=(c1_MOP_TA1_A*0.25)
        c1_MOP_TA6_A=(c1_MOP_TA1_A*0.25)

        // MOP Pre-seasonal

        c1_MOP_TA1_P=(pota_P*100)/60
        c1_MOP_TA2_P=(c1_MOP_TA1_P*0.1)
        c1_MOP_TA3_P=(c1_MOP_TA1_P*0.2)
        c1_MOP_TA4_P=(c1_MOP_TA1_P*0.2)
        c1_MOP_TA5_P=(c1_MOP_TA1_P*0.25)
        c1_MOP_TA6_P=(c1_MOP_TA1_P*0.25)

        // MOP Seasonal

        c1_MOP_TA1_S=(pota_S*100)/60
        c1_MOP_TA2_S=(c1_MOP_TA1_S*0.1)
        c1_MOP_TA3_S=(c1_MOP_TA1_S*0.2)
        c1_MOP_TA4_S=(c1_MOP_TA1_S*0.2)
        c1_MOP_TA5_S=(c1_MOP_TA1_S*0.25)
        c1_MOP_TA6_S=(c1_MOP_TA1_S*0.25)

        // UREA Adsali

        c1_UREA_TA1_A=(nitr_A-(c1_DAP_TA1_A*18/100))*(100/46)
        c1_UREA_TA2_A=(c1_UREA_TA1_A*0.1)
        c1_UREA_TA3_A=(c1_UREA_TA1_A*0.2)
        c1_UREA_TA4_A=(c1_UREA_TA1_A*0.2)
        c1_UREA_TA5_A=(c1_UREA_TA1_A*0.25)
        c1_UREA_TA6_A=(c1_UREA_TA1_A*0.25)

        // UREA Pre-seasonal

        c1_UREA_TA1_P=(nitr_P-(c1_DAP_TA1_P*18/100))*(100/46)
        c1_UREA_TA2_P=(c1_UREA_TA1_P*0.1)
        c1_UREA_TA3_P=(c1_UREA_TA1_P*0.2)
        c1_UREA_TA4_P=(c1_UREA_TA1_P*0.2)
        c1_UREA_TA5_P=(c1_UREA_TA1_P*0.25)
        c1_UREA_TA6_P=(c1_UREA_TA1_P*0.25)

        // UREA Seasonal

        c1_UREA_TA1_S=(nitr_S-(c1_DAP_TA1_S*18/100))*(100/46)
        c1_UREA_TA2_S=(c1_UREA_TA1_S*0.1)
        c1_UREA_TA3_S=(c1_UREA_TA1_S*0.2)
        c1_UREA_TA4_S=(c1_UREA_TA1_S*0.2)
        c1_UREA_TA5_S=(c1_UREA_TA1_S*0.25)
        c1_UREA_TA6_S=(c1_UREA_TA1_S*0.25)

        // Recommendations combination 2
       
        c2_SSP_TA1_A=(phos_A*100)/16
        c2_SSP_TA2_A=(phos_A*100)/16
        c2_SSP_TA1_P=(phos_P*100)/16
        c2_SSP_TA2_P=(phos_P*100)/16
        c2_SSP_TA1_S=(phos_S*100)/16
        c2_SSP_TA2_S=(phos_S*100)/16

        // MOP Adsali

        c2_MOP_TA1_A=(pota_A*100)/60
        c2_MOP_TA2_A=(c2_MOP_TA1_A*0.1)
        c2_MOP_TA3_A=(c2_MOP_TA1_A*0.2)
        c2_MOP_TA4_A=(c2_MOP_TA1_A*0.2)
        c2_MOP_TA5_A=(c2_MOP_TA1_A*0.25)
        c2_MOP_TA6_A=(c2_MOP_TA1_A*0.25)

        // MOP Pre-seasonal

        c2_MOP_TA1_P=(pota_P*100)/60
        c2_MOP_TA2_P=(c2_MOP_TA1_P*0.1)
        c2_MOP_TA3_P=(c2_MOP_TA1_P*0.2)
        c2_MOP_TA4_P=(c2_MOP_TA1_P*0.2)
        c2_MOP_TA5_P=(c2_MOP_TA1_P*0.25)
        c2_MOP_TA6_P=(c2_MOP_TA1_P*0.25)

        // MOP Seasonal

        c2_MOP_TA1_S=(pota_S*100)/60
        c2_MOP_TA2_S=(c2_MOP_TA1_S*0.1)
        c2_MOP_TA3_S=(c2_MOP_TA1_S*0.2)
        c2_MOP_TA4_S=(c2_MOP_TA1_S*0.2)
        c2_MOP_TA5_S=(c2_MOP_TA1_S*0.25)
        c2_MOP_TA6_S=(c2_MOP_TA1_S*0.25)

        // UREA Adsali

        c2_UREA_TA1_A=(nitr_A*100)/46
        c2_UREA_TA2_A=(c2_UREA_TA1_A*0.1)
        c2_UREA_TA3_A=(c2_UREA_TA1_A*0.2)
        c2_UREA_TA4_A=(c2_UREA_TA1_A*0.2)
        c2_UREA_TA5_A=(c2_UREA_TA1_A*0.25)
        c2_UREA_TA6_A=(c2_UREA_TA1_A*0.25)

        // UREA Pre-seasonal

        c2_UREA_TA1_P=(nitr_P*100)/46
        c2_UREA_TA2_P=(c2_UREA_TA1_P*0.1)
        c2_UREA_TA3_P=(c2_UREA_TA1_P*0.2)
        c2_UREA_TA4_P=(c2_UREA_TA1_P*0.2)
        c2_UREA_TA5_P=(c2_UREA_TA1_P*0.25)
        c2_UREA_TA6_P=(c2_UREA_TA1_P*0.25)

        // UREA Seasonal

        c2_UREA_TA1_S=(nitr_S*100)/46
        c2_UREA_TA2_S=(c2_UREA_TA1_S*0.1)
        c2_UREA_TA3_S=(c2_UREA_TA1_S*0.2)
        c2_UREA_TA4_S=(c2_UREA_TA1_S*0.2)
        c2_UREA_TA5_S=(c2_UREA_TA1_S*0.25)
        c2_UREA_TA6_S=(c2_UREA_TA1_S*0.25)

        // Recommendations combination 3
       
        c3_12_TA1_A=(phos_A*100)/32
        c3_12_TA2_A=(phos_A*100)/32
        c3_12_TA1_P=(phos_P*100)/32
        c3_12_TA2_P=(phos_P*100)/32
        c3_12_TA1_S=(phos_S*100)/32
        c3_12_TA2_S=(phos_S*100)/32

        // MOP Adsali

        c3_MOP_TA1_A=(pota_A-(c3_12_TA1_A*16/100))*100/60
        c3_MOP_TA2_A=(c3_MOP_TA1_A*0.1)
        c3_MOP_TA3_A=(c3_MOP_TA1_A*0.2)
        c3_MOP_TA4_A=(c3_MOP_TA1_A*0.2)
        c3_MOP_TA5_A=(c3_MOP_TA1_A*0.25)
        c3_MOP_TA6_A=(c3_MOP_TA1_A*0.25)

        // MOP Pre-seasonal

        c3_MOP_TA1_P=(pota_P-(c3_12_TA1_P*16/100))*100/60
        c3_MOP_TA2_P=(c3_MOP_TA1_P*0.1)
        c3_MOP_TA3_P=(c3_MOP_TA1_P*0.2)
        c3_MOP_TA4_P=(c3_MOP_TA1_P*0.2)
        c3_MOP_TA5_P=(c3_MOP_TA1_P*0.25)
        c3_MOP_TA6_P=(c3_MOP_TA1_P*0.25)

        // MOP Seasonal

        c3_MOP_TA1_S=(pota_S-(c3_12_TA1_S*16/100))*100/60
        c3_MOP_TA2_S=(c3_MOP_TA1_S*0.1)
        c3_MOP_TA3_S=(c3_MOP_TA1_S*0.2)
        c3_MOP_TA4_S=(c3_MOP_TA1_S*0.2)
        c3_MOP_TA5_S=(c3_MOP_TA1_S*0.25)
        c3_MOP_TA6_S=(c3_MOP_TA1_S*0.25)

        // UREA Adsali

        c3_UREA_TA1_A=(nitr_A-(c3_12_TA1_A*18/100))*(100/46)
        c3_UREA_TA2_A=(c3_UREA_TA1_A*0.1)
        c3_UREA_TA3_A=(c3_UREA_TA1_A*0.2)
        c3_UREA_TA4_A=(c3_UREA_TA1_A*0.2)
        c3_UREA_TA5_A=(c3_UREA_TA1_A*0.25)
        c3_UREA_TA6_A=(c3_UREA_TA1_A*0.25)

        // UREA Pre-seasonal

        c3_UREA_TA1_P=(nitr_P-(c3_12_TA1_P*18/100))*(100/46)
        c3_UREA_TA2_P=(c3_UREA_TA1_P*0.1)
        c3_UREA_TA3_P=(c3_UREA_TA1_P*0.2)
        c3_UREA_TA4_P=(c3_UREA_TA1_P*0.2)
        c3_UREA_TA5_P=(c3_UREA_TA1_P*0.25)
        c3_UREA_TA6_P=(c3_UREA_TA1_P*0.25)

        // UREA Seasonal

        c3_UREA_TA1_S=(nitr_S-(c3_12_TA1_S*18/100))*(100/46)
        c3_UREA_TA2_S=(c3_UREA_TA1_S*0.1)
        c3_UREA_TA3_S=(c3_UREA_TA1_S*0.2)
        c3_UREA_TA4_S=(c3_UREA_TA1_S*0.2)
        c3_UREA_TA5_S=(c3_UREA_TA1_S*0.25)
        c3_UREA_TA6_S=(c3_UREA_TA1_S*0.25)

        // Recommendations combination 4
       
        c4_10_TA1_A=(phos_A*100)/26
        c4_10_TA2_A=(phos_A*100)/26
        c4_10_TA1_P=(phos_P*100)/26
        c4_10_TA2_P=(phos_P*100)/26
        c4_10_TA1_S=(phos_S*100)/26
        c4_10_TA2_S=(phos_S*100)/26

        // MOP Adsali

        c4_MOP_TA1_A=(pota_A-(c4_10_TA1_A*26/100))*(100/60)
        c4_MOP_TA2_A=(c4_MOP_TA1_A*0.1)
        c4_MOP_TA3_A=(c4_MOP_TA1_A*0.2)
        c4_MOP_TA4_A=(c4_MOP_TA1_A*0.2)
        c4_MOP_TA5_A=(c4_MOP_TA1_A*0.25)
        c4_MOP_TA6_A=(c4_MOP_TA1_A*0.25)

        // MOP Pre-seasonal

        c4_MOP_TA1_P=(pota_P-(c4_10_TA1_P*26/100))*(100/60)
        c4_MOP_TA2_P=(c4_MOP_TA1_P*0.1)
        c4_MOP_TA3_P=(c4_MOP_TA1_P*0.2)
        c4_MOP_TA4_P=(c4_MOP_TA1_P*0.2)
        c4_MOP_TA5_P=(c4_MOP_TA1_P*0.25)
        c4_MOP_TA6_P=(c4_MOP_TA1_P*0.25)

        // MOP Seasonal

        c4_MOP_TA1_S=(pota_S-(c4_10_TA1_S*26/100))*(100/60)
        c4_MOP_TA2_S=(c4_MOP_TA1_S*0.1)
        c4_MOP_TA3_S=(c4_MOP_TA1_S*0.2)
        c4_MOP_TA4_S=(c4_MOP_TA1_S*0.2)
        c4_MOP_TA5_S=(c4_MOP_TA1_S*0.25)
        c4_MOP_TA6_S=(c4_MOP_TA1_S*0.25)

        // UREA Adsali

        c4_UREA_TA1_A=(nitr_A-(c4_10_TA1_A*10/100))*(100/46)
        c4_UREA_TA2_A=(c4_UREA_TA1_A*0.1)
        c4_UREA_TA3_A=(c4_UREA_TA1_A*0.2)
        c4_UREA_TA4_A=(c4_UREA_TA1_A*0.2)
        c4_UREA_TA5_A=(c4_UREA_TA1_A*0.25)
        c4_UREA_TA6_A=(c4_UREA_TA1_A*0.25)

        // UREA Pre-seasonal

        c4_UREA_TA1_P=(nitr_P-(c4_10_TA1_P*10/100))*(100/46)
        c4_UREA_TA2_P=(c4_UREA_TA1_P*0.1)
        c4_UREA_TA3_P=(c4_UREA_TA1_P*0.2)
        c4_UREA_TA4_P=(c4_UREA_TA1_P*0.2)
        c4_UREA_TA5_P=(c4_UREA_TA1_P*0.25)
        c4_UREA_TA6_P=(c4_UREA_TA1_P*0.25)

        // UREA Seasonal

        c4_UREA_TA1_S=(nitr_S-(c4_10_TA1_S*10/100))*(100/46)
        c4_UREA_TA2_S=(c4_UREA_TA1_S*0.1)
        c4_UREA_TA3_S=(c4_UREA_TA1_S*0.2)
        c4_UREA_TA4_S=(c4_UREA_TA1_S*0.2)
        c4_UREA_TA5_S=(c4_UREA_TA1_S*0.25)
        c4_UREA_TA6_S=(c4_UREA_TA1_S*0.25)
        
    
    crecomm_dict = {
    "c1": {
        "DAP": {
            "A": {
                "TA1": c1_DAP_TA1_A,
                "TA2": (phos_A * 100) / 46
            },
            "P": {
                "TA1": c1_DAP_TA1_P,
                "TA2": c1_DAP_TA2_P,
            },
            "S": {
                "TA1": c1_DAP_TA1_S,
                "TA2": c1_DAP_TA2_S,
            }
        },
        "MOP": {
            "A": {
                "TA1": c1_MOP_TA1_A,
                "TA2": c1_MOP_TA2_A,
                "TA3": c1_MOP_TA3_A,
                "TA4": c1_MOP_TA4_A,
                "TA5": c1_MOP_TA5_A,
                "TA6": c1_MOP_TA6_A,
            },
            "P": {
                "TA1": c1_MOP_TA1_P,
                "TA2": c1_MOP_TA2_P,
                "TA3": c1_MOP_TA3_P,
                "TA4": c1_MOP_TA4_P,
                "TA5": c1_MOP_TA5_P,
                "TA6": c1_MOP_TA6_P,
            },
            "S": {
                "TA1": c1_MOP_TA1_S,
                "TA2": c1_MOP_TA2_S,
                "TA3": c1_MOP_TA3_S,
                "TA4": c1_MOP_TA4_S,
                "TA5": c1_MOP_TA5_S,
                "TA6": c1_MOP_TA6_S,
            }
        },
        "UREA": {
            "A": {
                "TA1": c1_UREA_TA1_A,
                "TA2": c1_UREA_TA2_A,
                "TA3": c1_UREA_TA3_A,
                "TA4": c1_UREA_TA4_A,
                "TA5": c1_UREA_TA5_A,
                "TA6": c1_UREA_TA6_A,
            },
            "P": {
                "TA1": c1_UREA_TA1_P,
                "TA2": c1_UREA_TA2_P,
                "TA3": c1_UREA_TA3_P,
                "TA4": c1_UREA_TA4_P,
                "TA5": c1_UREA_TA5_P,
                "TA6": c1_UREA_TA6_P,
            },
            "S": {
                "TA1": c1_UREA_TA1_S,
                "TA2": c1_UREA_TA2_S,
                "TA3": c1_UREA_TA3_S,
                "TA4": c1_UREA_TA4_S,
                "TA5": c1_UREA_TA5_S,
                "TA6": c1_UREA_TA6_S,
            }
        }
    },
    "c2": {
        "SSP": {
            "A": {
                "TA1": c2_SSP_TA1_A,
                "TA2": c2_SSP_TA2_A,
            },
            "P": {
                "TA1": c2_SSP_TA1_P,
                "TA2": c2_SSP_TA2_P,
            },
            "S": {
                "TA1": c2_SSP_TA1_S,
                "TA2": c2_SSP_TA2_S,
            }
        },
        "MOP": {
            "A": {
                "TA1": c2_MOP_TA1_A,
                "TA2": c2_MOP_TA2_A,
                "TA3": c2_MOP_TA3_A,
                "TA4": c2_MOP_TA4_A,
                "TA5": c2_MOP_TA5_A,
                "TA6": c2_MOP_TA6_A,
            },
            "P": {
                "TA1": c2_MOP_TA1_P,
                "TA2": c2_MOP_TA2_P,
                "TA3": c2_MOP_TA3_P,
                "TA4": c2_MOP_TA4_P,
                "TA5": c2_MOP_TA5_P,
                "TA6": c2_MOP_TA6_P,
            },
            "S": {
                "TA1": c2_MOP_TA1_S,
                "TA2": c2_MOP_TA2_S,
                "TA3": c2_MOP_TA3_S,
                "TA4": c2_MOP_TA4_S,
                "TA5": c2_MOP_TA5_S,
                "TA6": c2_MOP_TA6_S,
            }
        },
        "UREA": {
            "A": {
                "TA1": c2_UREA_TA1_A,
                "TA2": c2_UREA_TA2_A,
                "TA3": c2_UREA_TA3_A,
                "TA4": c2_UREA_TA4_A,
                "TA5": c2_UREA_TA5_A,
                "TA6": c2_UREA_TA6_A,
            },
            "P": {
                "TA1": c2_UREA_TA1_P,
                "TA2": c2_UREA_TA2_P,
                "TA3": c2_UREA_TA3_P,
                "TA4": c2_UREA_TA4_P,
                "TA5": c2_UREA_TA5_P,
                "TA6": c2_UREA_TA6_P,
            },
            "S": {
                "TA1": c2_UREA_TA1_S,
                "TA2": c2_UREA_TA2_S,
                "TA3": c2_UREA_TA3_S,
                "TA4": c2_UREA_TA4_S,
                "TA5": c2_UREA_TA5_S,
                "TA6": c2_UREA_TA6_S,
            }
        }
    },
    "c3": {
        "12": {
            "A": {
                "TA1": c3_12_TA1_A,
                "TA2": c3_12_TA2_A,
            },
            "P": {
                "TA1": c3_12_TA1_P,
                "TA2": c3_12_TA2_P,
            },
            "S": {
                "TA1": c3_12_TA1_S,
                "TA2": c3_12_TA2_S,
            }
        },
        "MOP": {
            "A": {
                "TA1": c3_MOP_TA1_A,
                "TA2": c3_MOP_TA2_A,
                "TA3": c3_MOP_TA3_A,
                "TA4": c3_MOP_TA4_A,
                "TA5": c3_MOP_TA5_A,
                "TA6": c3_MOP_TA6_A,
            },
            "P": {
                "TA1": c3_MOP_TA1_P,
                "TA2": c3_MOP_TA2_P,
                "TA3": c3_MOP_TA3_P,
                "TA4": c3_MOP_TA4_P,
                "TA5": c3_MOP_TA5_P,
                "TA6": c3_MOP_TA6_P,
            },
            "S": {
                "TA1": c3_MOP_TA1_S,
                "TA2": c3_MOP_TA2_S,
                "TA3": c3_MOP_TA3_S,
                "TA4": c3_MOP_TA4_S,
                "TA5": c3_MOP_TA5_S,
                "TA6": c3_MOP_TA6_S,
            }
        },
        "UREA": {
            "A": {
                "TA1": c3_UREA_TA1_A,
                "TA2": c3_UREA_TA2_A,
                "TA3": c3_UREA_TA3_A,
                "TA4": c3_UREA_TA4_A,
                "TA5": c3_UREA_TA5_A,
                "TA6": c3_UREA_TA6_A,
            },
            "P": {
                "TA1": c3_UREA_TA1_P,
                "TA2": c3_UREA_TA2_P,
                "TA3": c3_UREA_TA3_P,
                "TA4": c3_UREA_TA4_P,
                "TA5": c3_UREA_TA5_P,
                "TA6": c3_UREA_TA6_P,
            },
            "S": {
                "TA1": c3_UREA_TA1_S,
                "TA2": c3_UREA_TA2_S,
                "TA3": c3_UREA_TA3_S,
                "TA4": c3_UREA_TA4_S,
                "TA5": c3_UREA_TA5_S,
                "TA6": c3_UREA_TA6_S,
            }
        }
    },
    "c4": {
        "10": {
            "A": {
                "TA1": c4_10_TA1_A,
                "TA2": c4_10_TA2_A,
            },
            "P": {
                "TA1": c4_10_TA1_P,
                "TA2": c4_10_TA2_P,
            },
            "S": {
                "TA1": c4_10_TA1_S,
                "TA2": c4_10_TA2_S,
            }
        },
        "MOP": {
            "A": {
                "TA1": c4_MOP_TA1_A,
                "TA2": c4_MOP_TA2_A,
                "TA3": c4_MOP_TA3_A,
                "TA4": c4_MOP_TA4_A,
                "TA5": c4_MOP_TA5_A,
                "TA6": c4_MOP_TA6_A,
            },
            "P": {
                "TA1": c4_MOP_TA1_P,
                "TA2": c4_MOP_TA2_P,
                "TA3": c4_MOP_TA3_P,
                "TA4": c4_MOP_TA4_P,
                "TA5": c4_MOP_TA5_P,
                "TA6": c4_MOP_TA6_P,
            },
            "S": {
                "TA1": c4_MOP_TA1_S,
                "TA2": c4_MOP_TA2_S,
                "TA3": c4_MOP_TA3_S,
                "TA4": c4_MOP_TA4_S,
                "TA5": c4_MOP_TA5_S,
                "TA6": c4_MOP_TA6_S,
            }
        },
        "UREA": {
            "A": {
                "TA1": c4_UREA_TA1_A,
                "TA2": c4_UREA_TA2_A,
                "TA3": c4_UREA_TA3_A,
                "TA4": c4_UREA_TA4_A,
                "TA5": c4_UREA_TA5_A,
                "TA6": c4_UREA_TA6_A,
            },
            "P": {
                "TA1": c4_UREA_TA1_P,
                "TA2": c4_UREA_TA2_P,
                "TA3": c4_UREA_TA3_P,
                "TA4": c4_UREA_TA4_P,
                "TA5": c4_UREA_TA5_P,
                "TA6": c4_UREA_TA6_P,
            },
            "S": {
                "TA1": c4_UREA_TA1_S,
                "TA2": c4_UREA_TA2_S,
                "TA3": c4_UREA_TA3_S,
                "TA4": c4_UREA_TA4_S,
                "TA5": c4_UREA_TA5_S,
                "TA6": c4_UREA_TA6_S,
            }
        }
    }
}

for (var crop in recomm_dict) {
    if (recomm_dict.hasOwnProperty(crop)) {
        
        var fertilizers = recomm_dict[crop];
        for (var fertilizer in fertilizers) {
            if (fertilizers.hasOwnProperty(fertilizer)) {
                
                var components = fertilizers[fertilizer];
                for (var component in components) {
                    if (components.hasOwnProperty(component)) {
                        
                        var timings = components[component];
                        for (var timing in timings) {
                            if (timings.hasOwnProperty(timing)) {
                                



return recomm_dict;

    }


