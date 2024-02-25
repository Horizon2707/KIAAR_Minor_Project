const express = require('express')
const app = express()

app.get('/',(req,res) => {
    const parameters = req.params

    const PN_phos = parameters.phosphorous
    const PN_pota = parameters.potassium
    const PN_nitr = parameters.nitrogen

    res.send('jkdhkuhdfk')

    calculations(phos,pota,nitr,SYT_S,SYT_P,SYT_A)
})

app.listen(5000, () =>{
    console.log('server')
})

function calculations(){
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

    }

    
