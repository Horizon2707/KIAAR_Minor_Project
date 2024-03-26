function calculations(phos, pota, nitr, SYT_A, SYT_P, SYT_S) {
  const nitr_A = parseFloat((4.39 * SYT_A - 1.56 * nitr).toFixed(1));
  const nitr_P = parseFloat((4.76 * SYT_P - 1.34 * nitr).toFixed(1));
  const nitr_S = parseFloat((4.76 * SYT_S - 1.34 * nitr).toFixed(1));
  const phos_A = parseFloat((1.24 * SYT_A - 1.55 * phos).toFixed(1));
  const phos_P = parseFloat((1.24 * SYT_P - 1.55 * phos).toFixed(1));
  const phos_S = parseFloat((1.24 * SYT_S - 1.55 * phos).toFixed(1));
  const pota_A = parseFloat((2.73 * SYT_A - 0.21 * pota).toFixed(1));
  const pota_P = parseFloat((2.73 * SYT_P - 0.21 * pota).toFixed(1));
  const pota_S = parseFloat((2.73 * SYT_S - 0.21 * pota).toFixed(1));

  // Recommendations combination 1

  const c1_DAP_TOT_A = parseFloat(((phos_A * 100) / 46).toFixed(1));
  const c1_DAP_TA1_A = parseFloat(((phos_A * 100) / 46).toFixed(1));
  const c1_DAP_TOT_P = parseFloat(((phos_P * 100) / 46).toFixed(1));
  const c1_DAP_TA1_P = parseFloat(((phos_P * 100) / 46).toFixed(1));
  const c1_DAP_TOT_S = parseFloat(((phos_S * 100) / 46).toFixed(1));
  const c1_DAP_TA1_S = parseFloat(((phos_S * 100) / 46).toFixed(1));

  // MOP Adsali

  const c1_MOP_TOT_A = parseFloat(((pota_A * 100) / 60).toFixed(1));
  const c1_MOP_TA1_A = parseFloat((c1_MOP_TOT_A * 0.1).toFixed(1));
  const c1_MOP_TA2_A = parseFloat((c1_MOP_TOT_A * 0.2).toFixed(1));
  const c1_MOP_TA3_A = parseFloat((c1_MOP_TOT_A * 0.2).toFixed(1));
  const c1_MOP_TA4_A = parseFloat((c1_MOP_TOT_A * 0.25).toFixed(1));
  const c1_MOP_TA5_A = parseFloat((c1_MOP_TOT_A * 0.25).toFixed(1));

  // MOP Pre-seasonal

  const c1_MOP_TOT_P = parseFloat(((pota_P * 100) / 60).toFixed(1));
  const c1_MOP_TA1_P = parseFloat((c1_MOP_TOT_P * 0.1).toFixed(1));
  const c1_MOP_TA2_P = parseFloat((c1_MOP_TOT_P * 0.2).toFixed(1));
  const c1_MOP_TA3_P = parseFloat((c1_MOP_TOT_P * 0.2).toFixed(1));
  const c1_MOP_TA4_P = parseFloat((c1_MOP_TOT_P * 0.25).toFixed(1));
  const c1_MOP_TA5_P = parseFloat((c1_MOP_TOT_P * 0.25).toFixed(1));

  // MOP Seasonal

  const c1_MOP_TOT_S = parseFloat(((pota_S * 100) / 60).toFixed(1));
  const c1_MOP_TA1_S = parseFloat((c1_MOP_TOT_S * 0.1).toFixed(1));
  const c1_MOP_TA2_S = parseFloat((c1_MOP_TOT_S * 0.2).toFixed(1));
  const c1_MOP_TA3_S = parseFloat((c1_MOP_TOT_S * 0.2).toFixed(1));
  const c1_MOP_TA4_S = parseFloat((c1_MOP_TOT_S * 0.25).toFixed(1));
  const c1_MOP_TA5_S = parseFloat((c1_MOP_TOT_S * 0.25).toFixed(1));

  // UREA Adsali

  const c1_UREA_TOT_A = parseFloat(
    ((nitr_A - (c1_DAP_TOT_A * 18) / 100) * (100 / 46)).toFixed(1)
  );
  const c1_UREA_TA1_A = parseFloat((c1_UREA_TOT_A * 0.1).toFixed(1));
  const c1_UREA_TA2_A = parseFloat((c1_UREA_TOT_A * 0.2).toFixed(1));
  const c1_UREA_TA3_A = parseFloat((c1_UREA_TOT_A * 0.2).toFixed(1));
  const c1_UREA_TA4_A = parseFloat((c1_UREA_TOT_A * 0.25).toFixed(1));
  const c1_UREA_TA5_A = parseFloat((c1_UREA_TOT_A * 0.25).toFixed(1));

  // UREA Pre-seasonal

  const c1_UREA_TOT_P = parseFloat(
    ((nitr_P - (c1_DAP_TOT_P * 18) / 100) * (100 / 46)).toFixed(1)
  );
  const c1_UREA_TA1_P = parseFloat((c1_UREA_TOT_P * 0.1).toFixed(1));
  const c1_UREA_TA2_P = parseFloat((c1_UREA_TOT_P * 0.2).toFixed(1));
  const c1_UREA_TA3_P = parseFloat((c1_UREA_TOT_P * 0.2).toFixed(1));
  const c1_UREA_TA4_P = parseFloat((c1_UREA_TOT_P * 0.25).toFixed(1));
  const c1_UREA_TA5_P = parseFloat((c1_UREA_TOT_P * 0.25).toFixed(1));

  // UREA Seasonal

  const c1_UREA_TOT_S = parseFloat(
    ((nitr_S - (c1_DAP_TOT_S * 18) / 100) * (100 / 46)).toFixed(1)
  );
  const c1_UREA_TA1_S = parseFloat((c1_UREA_TOT_S * 0.1).toFixed(1));
  const c1_UREA_TA2_S = parseFloat((c1_UREA_TOT_S * 0.2).toFixed(1));
  const c1_UREA_TA3_S = parseFloat((c1_UREA_TOT_S * 0.2).toFixed(1));
  const c1_UREA_TA4_S = parseFloat((c1_UREA_TOT_S * 0.25).toFixed(1));
  const c1_UREA_TA5_S = parseFloat((c1_UREA_TOT_S * 0.25).toFixed(1));

  // Recommendations combination 2

  const c2_SSP_TOT_A = parseFloat(((phos_A * 100) / 16).toFixed(1));
  const c2_SSP_TA1_A = parseFloat(((phos_A * 100) / 16).toFixed(1));
  const c2_SSP_TOT_P = parseFloat(((phos_P * 100) / 16).toFixed(1));
  const c2_SSP_TA1_P = parseFloat(((phos_P * 100) / 16).toFixed(1));
  const c2_SSP_TOT_S = parseFloat(((phos_S * 100) / 16).toFixed(1));
  const c2_SSP_TA1_S = parseFloat(((phos_S * 100) / 16).toFixed(1));

  // MOP Adsali

  const c2_MOP_TOT_A = parseFloat(((pota_A * 100) / 60).toFixed(1));
  const c2_MOP_TA1_A = parseFloat((c2_MOP_TOT_A * 0.1).toFixed(1));
  const c2_MOP_TA2_A = parseFloat((c2_MOP_TOT_A * 0.2).toFixed(1));
  const c2_MOP_TA3_A = parseFloat((c2_MOP_TOT_A * 0.2).toFixed(1));
  const c2_MOP_TA4_A = parseFloat((c2_MOP_TOT_A * 0.25).toFixed(1));
  const c2_MOP_TA5_A = parseFloat((c2_MOP_TOT_A * 0.25).toFixed(1));

  // MOP Pre-seasonal

  const c2_MOP_TOT_P = parseFloat(((pota_P * 100) / 60).toFixed(1));
  const c2_MOP_TA1_P = parseFloat((c2_MOP_TOT_P * 0.1).toFixed(1));
  const c2_MOP_TA2_P = parseFloat((c2_MOP_TOT_P * 0.2).toFixed(1));
  const c2_MOP_TA3_P = parseFloat((c2_MOP_TOT_P * 0.2).toFixed(1));
  const c2_MOP_TA4_P = parseFloat((c2_MOP_TOT_P * 0.25).toFixed(1));
  const c2_MOP_TA5_P = parseFloat((c2_MOP_TOT_P * 0.25).toFixed(1));

  // MOP Seasonal

  const c2_MOP_TOT_S = parseFloat(((pota_S * 100) / 60).toFixed(1));
  const c2_MOP_TA1_S = parseFloat((c2_MOP_TOT_S * 0.1).toFixed(1));
  const c2_MOP_TA2_S = parseFloat((c2_MOP_TOT_S * 0.2).toFixed(1));
  const c2_MOP_TA3_S = parseFloat((c2_MOP_TOT_S * 0.2).toFixed(1));
  const c2_MOP_TA4_S = parseFloat((c2_MOP_TOT_S * 0.25).toFixed(1));
  const c2_MOP_TA5_S = parseFloat((c2_MOP_TOT_S * 0.25).toFixed(1));

  // UREA Adsali

  const c2_UREA_TOT_A = parseFloat(((nitr_A * 100) / 46).toFixed(1));
  const c2_UREA_TA1_A = parseFloat((c2_UREA_TOT_A * 0.1).toFixed(1));
  const c2_UREA_TA2_A = parseFloat((c2_UREA_TOT_A * 0.2).toFixed(1));
  const c2_UREA_TA3_A = parseFloat((c2_UREA_TOT_A * 0.2).toFixed(1));
  const c2_UREA_TA4_A = parseFloat((c2_UREA_TOT_A * 0.25).toFixed(1));
  const c2_UREA_TA5_A = parseFloat((c2_UREA_TOT_A * 0.25).toFixed(1));

  // UREA Pre-seasonal

  const c2_UREA_TOT_P = parseFloat(((nitr_P * 100) / 46).toFixed(1));
  const c2_UREA_TA1_P = parseFloat((c2_UREA_TOT_P * 0.1).toFixed(1));
  const c2_UREA_TA2_P = parseFloat((c2_UREA_TOT_P * 0.2).toFixed(1));
  const c2_UREA_TA3_P = parseFloat((c2_UREA_TOT_P * 0.2).toFixed(1));
  const c2_UREA_TA4_P = parseFloat((c2_UREA_TOT_P * 0.25).toFixed(1));
  const c2_UREA_TA5_P = parseFloat((c2_UREA_TOT_P * 0.25).toFixed(1));

  // UREA Seasonal

  const c2_UREA_TOT_S = parseFloat(((nitr_S * 100) / 46).toFixed(1));
  const c2_UREA_TA1_S = parseFloat((c2_UREA_TOT_S * 0.1).toFixed(1));
  const c2_UREA_TA2_S = parseFloat((c2_UREA_TOT_S * 0.2).toFixed(1));
  const c2_UREA_TA3_S = parseFloat((c2_UREA_TOT_S * 0.2).toFixed(1));
  const c2_UREA_TA4_S = parseFloat((c2_UREA_TOT_S * 0.25).toFixed(1));
  const c2_UREA_TA5_S = parseFloat((c2_UREA_TOT_S * 0.25).toFixed(1));

  // Recommendations combination 3

  const c3_12_TOT_A = parseFloat(((phos_A * 100) / 32).toFixed(1));
  const c3_12_TA1_A = parseFloat(((phos_A * 100) / 32).toFixed(1));
  const c3_12_TOT_P = parseFloat(((phos_P * 100) / 32).toFixed(1));
  const c3_12_TA1_P = parseFloat(((phos_P * 100) / 32).toFixed(1));
  const c3_12_TOT_S = parseFloat(((phos_S * 100) / 32).toFixed(1));
  const c3_12_TA1_S = parseFloat(((phos_S * 100) / 32).toFixed(1));

  // MOP Adsalconst i

  const c3_MOP_TOT_A = parseFloat(
    (((pota_A - (c3_12_TOT_A * 16) / 100) * 100) / 60).toFixed(1)
  );
  const c3_MOP_TA1_A = parseFloat((c3_MOP_TOT_A * 0.1).toFixed(1));
  const c3_MOP_TA2_A = parseFloat((c3_MOP_TOT_A * 0.2).toFixed(1));
  const c3_MOP_TA3_A = parseFloat((c3_MOP_TOT_A * 0.2).toFixed(1));
  const c3_MOP_TA4_A = parseFloat((c3_MOP_TOT_A * 0.25).toFixed(1));
  const c3_MOP_TA5_A = parseFloat((c3_MOP_TOT_A * 0.25).toFixed(1));

  // MOP Pre-seasonal

  const c3_MOP_TOT_P = parseFloat(
    (((pota_P - (c3_12_TOT_P * 16) / 100) * 100) / 60).toFixed(1)
  );
  const c3_MOP_TA1_P = parseFloat((c3_MOP_TOT_P * 0.1).toFixed(1));
  const c3_MOP_TA2_P = parseFloat((c3_MOP_TOT_P * 0.2).toFixed(1));
  const c3_MOP_TA3_P = parseFloat((c3_MOP_TOT_P * 0.2).toFixed(1));
  const c3_MOP_TA4_P = parseFloat((c3_MOP_TOT_P * 0.25).toFixed(1));
  const c3_MOP_TA5_P = parseFloat((c3_MOP_TOT_P * 0.25).toFixed(1));

  // MOP Seasonal

  const c3_MOP_TOT_S = parseFloat(
    (((pota_S - (c3_12_TOT_S * 16) / 100) * 100) / 60).toFixed(1)
  );
  const c3_MOP_TA1_S = parseFloat((c3_MOP_TOT_S * 0.1).toFixed(1));
  const c3_MOP_TA2_S = parseFloat((c3_MOP_TOT_S * 0.2).toFixed(1));
  const c3_MOP_TA3_S = parseFloat((c3_MOP_TOT_S * 0.2).toFixed(1));
  const c3_MOP_TA4_S = parseFloat((c3_MOP_TOT_S * 0.25).toFixed(1));
  const c3_MOP_TA5_S = parseFloat((c3_MOP_TOT_S * 0.25).toFixed(1));
  // UREA Adsali

  const c3_UREA_TOT_A = parseFloat(
    ((nitr_A - (c3_12_TOT_A * 18) / 100) * (100 / 46)).toFixed(1)
  );
  const c3_UREA_TA1_A = parseFloat((c3_UREA_TOT_A * 0.1).toFixed(1));
  const c3_UREA_TA2_A = parseFloat((c3_UREA_TOT_A * 0.2).toFixed(1));
  const c3_UREA_TA3_A = parseFloat((c3_UREA_TOT_A * 0.2).toFixed(1));
  const c3_UREA_TA4_A = parseFloat((c3_UREA_TOT_A * 0.25).toFixed(1));
  const c3_UREA_TA5_A = parseFloat((c3_UREA_TOT_A * 0.25).toFixed(1));

  // UREA Pre-seasonal

  const c3_UREA_TOT_P = parseFloat(
    ((nitr_P - (c3_12_TOT_P * 18) / 100) * (100 / 46)).toFixed(1)
  );
  const c3_UREA_TA1_P = parseFloat((c3_UREA_TOT_P * 0.1).toFixed(1));
  const c3_UREA_TA2_P = parseFloat((c3_UREA_TOT_P * 0.2).toFixed(1));
  const c3_UREA_TA3_P = parseFloat((c3_UREA_TOT_P * 0.2).toFixed(1));
  const c3_UREA_TA4_P = parseFloat((c3_UREA_TOT_P * 0.25).toFixed(1));
  const c3_UREA_TA5_P = parseFloat((c3_UREA_TOT_P * 0.25).toFixed(1));

  // UREA Seasonal for Recommendations combination 3
  const c3_UREA_TOT_S = parseFloat(
    ((nitr_S - (c3_12_TOT_S * 18) / 100) * (100 / 46)).toFixed(1)
  );
  const c3_UREA_TA1_S = parseFloat((c3_UREA_TOT_S * 0.1).toFixed(1));
  const c3_UREA_TA2_S = parseFloat((c3_UREA_TOT_S * 0.2).toFixed(1));
  const c3_UREA_TA3_S = parseFloat((c3_UREA_TOT_S * 0.2).toFixed(1));
  const c3_UREA_TA4_S = parseFloat((c3_UREA_TOT_S * 0.25).toFixed(1));
  const c3_UREA_TA5_S = parseFloat((c3_UREA_TOT_S * 0.25).toFixed(1));

  // floor each constant to the nearest integer using parseFloat(()

  // For Recommendations combination 4

  const c4_10_TOT_A = parseFloat(((phos_A * 100) / 26).toFixed(1));
  const c4_10_TA1_A = parseFloat(((phos_A * 100) / 26).toFixed(1));
  const c4_10_TOT_P = parseFloat(((phos_P * 100) / 26).toFixed(1));
  const c4_10_TA1_P = parseFloat(((phos_P * 100) / 26).toFixed(1));
  const c4_10_TOT_S = parseFloat(((phos_S * 100) / 26).toFixed(1));
  const c4_10_TA1_S = parseFloat(((phos_S * 100) / 26).toFixed(1));

  // For MOP Adsali

  const c4_MOP_TOT_A = parseFloat(
    ((pota_A - (c4_10_TOT_A * 26) / 100) * (100 / 60)).toFixed(1)
  );
  const c4_MOP_TA1_A = parseFloat((c4_MOP_TOT_A * 0.1).toFixed(1));
  const c4_MOP_TA2_A = parseFloat((c4_MOP_TOT_A * 0.2).toFixed(1));
  const c4_MOP_TA3_A = parseFloat((c4_MOP_TOT_A * 0.2).toFixed(1));
  const c4_MOP_TA4_A = parseFloat((c4_MOP_TOT_A * 0.25).toFixed(1));
  const c4_MOP_TA5_A = parseFloat((c4_MOP_TOT_A * 0.25).toFixed(1));

  // MOP Pre-seasonal

  const c4_MOP_TOT_P = parseFloat(
    ((pota_P - (c4_10_TOT_P * 26) / 100) * (100 / 60)).toFixed(1)
  );
  const c4_MOP_TA1_P = parseFloat((c4_MOP_TOT_P * 0.1).toFixed(1));
  const c4_MOP_TA2_P = parseFloat((c4_MOP_TOT_P * 0.2).toFixed(1));
  const c4_MOP_TA3_P = parseFloat((c4_MOP_TOT_P * 0.2).toFixed(1));
  const c4_MOP_TA4_P = parseFloat((c4_MOP_TOT_P * 0.25).toFixed(1));
  const c4_MOP_TA5_P = parseFloat((c4_MOP_TOT_P * 0.25).toFixed(1));

  // MOP Seasonal

  // For MOP Adsali

  const c4_MOP_TOT_S = parseFloat(
    ((pota_S - (c4_10_TOT_S * 26) / 100) * (100 / 60)).toFixed(1)
  );
  const c4_MOP_TA1_S = parseFloat((c4_MOP_TOT_S * 0.1).toFixed(1));
  const c4_MOP_TA2_S = parseFloat((c4_MOP_TOT_S * 0.2).toFixed(1));
  const c4_MOP_TA3_S = parseFloat((c4_MOP_TOT_S * 0.2).toFixed(1));
  const c4_MOP_TA4_S = parseFloat((c4_MOP_TOT_S * 0.25).toFixed(1));
  const c4_MOP_TA5_S = parseFloat((c4_MOP_TOT_S * 0.25).toFixed(1));

  // UREA Adsali

  const c4_UREA_TOT_A = parseFloat(
    ((nitr_A - (c4_10_TOT_A * 10) / 100) * (100 / 46)).toFixed(1)
  );
  const c4_UREA_TA1_A = parseFloat((c4_UREA_TOT_A * 0.1).toFixed(1));
  const c4_UREA_TA2_A = parseFloat((c4_UREA_TOT_A * 0.2).toFixed(1));
  const c4_UREA_TA3_A = parseFloat((c4_UREA_TOT_A * 0.2).toFixed(1));
  const c4_UREA_TA4_A = parseFloat((c4_UREA_TOT_A * 0.25).toFixed(1));
  const c4_UREA_TA5_A = parseFloat((c4_UREA_TOT_A * 0.25).toFixed(1));

  // UREA Pre-seasonal

  const c4_UREA_TOT_P = parseFloat(
    ((nitr_P - (c4_10_TOT_P * 10) / 100) * (100 / 46)).toFixed(1)
  );
  const c4_UREA_TA1_P = parseFloat((c4_UREA_TOT_P * 0.1).toFixed(1));
  const c4_UREA_TA2_P = parseFloat((c4_UREA_TOT_P * 0.2).toFixed(1));
  const c4_UREA_TA3_P = parseFloat((c4_UREA_TOT_P * 0.2).toFixed(1));
  const c4_UREA_TA4_P = parseFloat((c4_UREA_TOT_P * 0.25).toFixed(1));
  const c4_UREA_TA5_P = parseFloat((c4_UREA_TOT_P * 0.25).toFixed(1));

  // UREA Seasonal

  const c4_UREA_TOT_S = parseFloat(
    ((nitr_S - (c4_10_TOT_S * 10) / 100) * (100 / 46)).toFixed(1)
  );
  const c4_UREA_TA1_S = parseFloat((c4_UREA_TOT_S * 0.1).toFixed(1));
  const c4_UREA_TA2_S = parseFloat((c4_UREA_TOT_S * 0.2).toFixed(1));
  const c4_UREA_TA3_S = parseFloat((c4_UREA_TOT_S * 0.2).toFixed(1));
  const c4_UREA_TA4_S = parseFloat((c4_UREA_TOT_S * 0.25).toFixed(1));
  const c4_UREA_TA5_S = parseFloat((c4_UREA_TOT_S * 0.25).toFixed(1));

  //   recomm_dict = {
  //     c1: {
  //       A: {
  //         DAP: {
  //           TOT: c1_DAP_TOT_A,
  //           TA1: (phos_A * 100) / 46,
  //           TA2: 0,
  //           TA3: 0,
  //           TA5: 0,
  //           TA5: 0,
  //         },
  //         MOP: {
  //           TOT: c1_MOP_TOT_A,
  //           TA1: c1_MOP_TA2_A,
  //           TA2: c1_MOP_TA2_A,
  //           TA3: c1_MOP_TA3_A,
  //           TA5: c1_MOP_TA5_A,
  //           TA5: c1_MOP_TA5_A,
  //         },
  //         UREA: {
  //           TOT: c1_UREA_TOT_A,
  //           TA1: c1_UREA_TA2_A,
  //           TA2: c1_UREA_TA2_A,
  //           TA3: c1_UREA_TA3_A,
  //           TA4: c1_UREA_TA5_A,
  //           TA5: c1_UREA_TA5_A,
  //         },
  //       },
  //       P: {
  //         DAP: {
  //           TOT: c1_DAP_TOT_P,
  //           TA1: c1_DAP_TA2_P,
  //           TA2: 0,
  //           TA3: 0,
  //           TA5: 0,
  //           TA5: 0,
  //         },
  //         MOP: {
  //           TOT: c1_MOP_TOT_P,
  //           TA1: c1_MOP_TA2_P,
  //           TA2: c1_MOP_TA2_P,
  //           TA3: c1_MOP_TA3_P,
  //           TA5: c1_MOP_TA5_P,
  //           TA5: c1_MOP_TA5_P,
  //         },
  //         UREA: {
  //           TOT: c1_UREA_TOT_P,
  //           TA1: c1_UREA_TA2_P,
  //           TA2: c1_UREA_TA2_P,
  //           TA3: c1_UREA_TA3_P,
  //           TA5: c1_UREA_TA5_P,
  //           TA5: c1_UREA_TA5_P,
  //         },
  //       },
  //       S: {
  //         DAP: {
  //           TOT: c1_DAP_TOT_S,
  //           TA1: c1_DAP_TA2_S,
  //           TA2: 0,
  //           TA3: 0,
  //           TA5: 0,
  //           TA5: 0,
  //         },
  //         MOP: {
  //           TOT: c1_MOP_TOT_S,
  //           TA1: c1_MOP_TA2_S,
  //           TA2: c1_MOP_TA2_S,
  //           TA3: c1_MOP_TA3_S,
  //           TA5: c1_MOP_TA5_S,
  //           TA5: c1_MOP_TA5_S,
  //         },
  //         UREA: {
  //           TOT: c1_UREA_TOT_S,
  //           TA1: c1_UREA_TA2_S,
  //           TA2: c1_UREA_TA2_S,
  //           TA3: c1_UREA_TA3_S,
  //           TA5: c1_UREA_TA5_S,
  //           TA5: c1_UREA_TA5_S,
  //         },
  //       },
  //     },
  //     c2: {
  //       A: {
  //         SSP: {
  //           TOT: c2_SSP_TOT_A,
  //           TA1: c2_SSP_TA2_A,
  //           TA2: 0,
  //           TA3: 0,
  //           TA5: 0,
  //           TA5: 0,
  //         },
  //         MOP: {
  //           TOT: c2_MOP_TOT_A,
  //           TA1: c2_MOP_TA2_A,
  //           TA2: c2_MOP_TA2_A,
  //           TA3: c2_MOP_TA3_A,
  //           TA5: c2_MOP_TA5_A,
  //           TA5: c2_MOP_TA5_A,
  //         },
  //         UREA: {
  //           TOT: c2_UREA_TOT_A,
  //           TA1: c2_UREA_TA2_A,
  //           TA2: c2_UREA_TA2_A,
  //           TA3: c2_UREA_TA3_A,
  //           TA5: c2_UREA_TA5_A,
  //           TA5: c2_UREA_TA5_A,
  //         },
  //       },
  //       P: {
  //         SSP: {
  //           TOT: c2_SSP_TOT_P,
  //           TA1: c2_SSP_TA2_P,
  //           TA2: 0,
  //           TA3: 0,
  //           TA5: 0,
  //           TA5: 0,
  //         },
  //         MOP: {
  //           TOT: c2_MOP_TOT_P,
  //           TA1: c2_MOP_TA2_P,
  //           TA2: c2_MOP_TA2_P,
  //           TA3: c2_MOP_TA3_P,
  //           TA5: c2_MOP_TA5_P,
  //           TA5: c2_MOP_TA5_P,
  //         },
  //         UREA: {
  //           TOT: c2_UREA_TOT_P,
  //           TA1: c2_UREA_TA2_P,
  //           TA2: c2_UREA_TA2_P,
  //           TA3: c2_UREA_TA3_P,
  //           TA5: c2_UREA_TA5_P,
  //           TA5: c2_UREA_TA5_P,
  //         },
  //       },
  //       S: {
  //         SSP: {
  //           TOT: c2_SSP_TOT_S,
  //           TA1: c2_SSP_TA2_S,
  //           TA2: 0,
  //           TA3: 0,
  //           TA5: 0,
  //           TA5: 0,
  //         },
  //         MOP: {
  //           TOT: c2_MOP_TOT_S,
  //           TA1: c2_MOP_TA2_S,
  //           TA2: c2_MOP_TA2_S,
  //           TA3: c2_MOP_TA3_S,
  //           TA5: c2_MOP_TA5_S,
  //           TA5: c2_MOP_TA5_S,
  //         },
  //         UREA: {
  //           TOT: c2_UREA_TOT_S,
  //           TA1: c2_UREA_TA2_S,
  //           TA2: c2_UREA_TA2_S,
  //           TA3: c2_UREA_TA3_S,
  //           TA5: c2_UREA_TA5_S,
  //           TA5: c2_UREA_TA5_S,
  //         },
  //       },
  //     },
  //     c3: {
  //       A: {
  //         12: {
  //           TOT: c3_12_TOT_A,
  //           TA1: c3_12_TA2_A,
  //           TA2: 0,
  //           TA3: 0,
  //           TA5: 0,
  //           TA5: 0,
  //         },
  //         MOP: {
  //           TOT: c3_MOP_TOT_A,
  //           TA1: c3_MOP_TA2_A,
  //           TA2: c3_MOP_TA2_A,
  //           TA3: c3_MOP_TA3_A,
  //           TA5: c3_MOP_TA5_A,
  //           TA5: c3_MOP_TA5_A,
  //         },
  //         UREA: {
  //           TOT: c3_UREA_TOT_A,
  //           TA1: c3_UREA_TA2_A,
  //           TA2: c3_UREA_TA2_A,
  //           TA3: c3_UREA_TA3_A,
  //           TA5: c3_UREA_TA5_A,
  //           TA5: c3_UREA_TA5_A,
  //         },
  //       },
  //       P: {
  //         12: {
  //           TOT: c3_12_TOT_P,
  //           TA1: c3_12_TA2_P,
  //           TA2: 0,
  //           TA3: 0,
  //           TA5: 0,
  //           TA5: 0,
  //         },
  //         MOP: {
  //           TOT: c3_MOP_TOT_P,
  //           TA1: c3_MOP_TA2_P,
  //           TA2: c3_MOP_TA2_P,
  //           TA3: c3_MOP_TA3_P,
  //           TA5: c3_MOP_TA5_P,
  //           TA5: c3_MOP_TA5_P,
  //         },
  //         UREA: {
  //           TOT: c3_UREA_TOT_P,
  //           TA1: c3_UREA_TA2_P,
  //           TA2: c3_UREA_TA2_P,
  //           TA3: c3_UREA_TA3_P,
  //           TA5: c3_UREA_TA5_P,
  //           TA5: c3_UREA_TA5_P,
  //         },
  //       },
  //       S: {
  //         12: {
  //           TOT: c3_12_TOT_S,
  //           TA1: c3_12_TA2_S,
  //           TA2: 0,
  //           TA3: 0,
  //           TA5: 0,
  //           TA5: 0,
  //         },
  //         MOP: {
  //           TOT: c3_MOP_TOT_S,
  //           TA1: c3_MOP_TA2_S,
  //           TA2: c3_MOP_TA2_S,
  //           TA3: c3_MOP_TA3_S,
  //           TA5: c3_MOP_TA5_S,
  //           TA5: c3_MOP_TA5_S,
  //         },
  //         UREA: {
  //           TOT: c3_UREA_TOT_S,
  //           TA1: c3_UREA_TA2_S,
  //           TA2: c3_UREA_TA2_S,
  //           TA3: c3_UREA_TA3_S,
  //           TA5: c3_UREA_TA5_S,
  //           TA5: c3_UREA_TA5_S,
  //         },
  //       },
  //     },
  //     c4: {
  //       A: {
  //         10: {
  //           TOT: c4_10_TOT_A,
  //           TA1: c4_10_TA2_A,
  //           TA2: 0,
  //           TA3: 0,
  //           TA5: 0,
  //           TA5: 0,
  //         },
  //         MOP: {
  //           TOT: c4_MOP_TOT_A,
  //           TA1: c4_MOP_TA2_A,
  //           TA2: c4_MOP_TA2_A,
  //           TA3: c4_MOP_TA3_A,
  //           TA5: c4_MOP_TA5_A,
  //           TA5: c4_MOP_TA5_A,
  //         },
  //         UREA: {
  //           TOT: c4_UREA_TOT_A,
  //           TA1: c4_UREA_TA2_A,
  //           TA2: c4_UREA_TA2_A,
  //           TA3: c4_UREA_TA3_A,
  //           TA5: c4_UREA_TA5_A,
  //           TA5: c4_UREA_TA5_A,
  //         },
  //       },
  //       P: {
  //         10: {
  //           TOT: c4_10_TOT_P,
  //           TA1: c4_10_TA2_P,
  //           TA2: 0,
  //           TA3: 0,
  //           TA5: 0,
  //           TA5: 0,
  //         },
  //         MOP: {
  //           TOT: c4_MOP_TOT_P,
  //           TA1: c4_MOP_TA2_P,
  //           TA2: c4_MOP_TA2_P,
  //           TA3: c4_MOP_TA3_P,
  //           TA5: c4_MOP_TA5_P,
  //           TA5: c4_MOP_TA5_P,
  //         },
  //         UREA: {
  //           TOT: c4_UREA_TOT_P,
  //           TA1: c4_UREA_TA2_P,
  //           TA2: c4_UREA_TA2_P,
  //           TA3: c4_UREA_TA3_P,
  //           TA5: c4_UREA_TA5_P,
  //           TA5: c4_UREA_TA5_P,
  //         },
  //       },
  //       S: {
  //         10: {
  //           TOT: c4_10_TOT_S,
  //           TA1: c4_10_TA2_S,
  //           TA2: 0,
  //           TA3: 0,
  //           TA5: 0,
  //           TA5: 0,
  //         },
  //         MOP: {
  //           TOT: c4_MOP_TOT_S,
  //           TA1: c4_MOP_TA2_S,
  //           TA2: c4_MOP_TA2_S,
  //           TA3: c4_MOP_TA3_S,
  //           TA5: c4_MOP_TA5_S,
  //           TA5: c4_MOP_TA5_S,
  //         },
  //         UREA: {
  //           TOT: c4_UREA_TOT_S,
  //           TA1: c4_UREA_TA2_S,
  //           TA2: c4_UREA_TA2_S,
  //           TA3: c4_UREA_TA3_S,
  //           TA5: c4_UREA_TA5_S,
  //           TA5: c4_UREA_TA5_S,
  //         },
  //       },
  //     },
  //   };

  //   return recomm_dict;
  // }

  const recomm = {
    12: {
      1: {
        6: {
          1: 0,
        },
        8: {
          1: 0,
        },
        9: {
          1: 0,
        },
        10: {
          1: 0,
        },
        27: {
          1: nitr_A,
        },
        28: {
          1: pota_A,
        },
        29: {
          1: phos_A,
        },
        47: {
          1: 0,
        },
      },
      2: {
        27: {
          1: nitr_P,
        },
        28: {
          1: pota_P,
        },
        29: {
          1: phos_P,
        },
      },
      3: {
        27: {
          1: nitr_S,
        },
        28: {
          1: pota_S,
        },
        29: {
          1: phos_S,
        },
      },
    },
    103: {
      1: {
        23: {
          TOT: c1_DAP_TOT_A,
          1: c1_DAP_TOT_A,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        },
        32: {
          TOT: c1_MOP_TOT_A,
          1: c1_MOP_TA1_A,
          2: c1_MOP_TA2_A,
          3: c1_MOP_TA3_A,
          4: c1_MOP_TA4_A,
          5: c1_MOP_TA5_A,
        },
        20: {
          TOT: c1_UREA_TOT_A,
          1: c1_UREA_TA1_A,
          2: c1_UREA_TA2_A,
          3: c1_UREA_TA3_A,
          4: c1_UREA_TA4_A,
          5: c1_UREA_TA5_A,
        },
      },
      2: {
        23: {
          TOT: c1_DAP_TOT_P,
          1: c1_DAP_TOT_P,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        },
        32: {
          TOT: c1_MOP_TOT_P,
          1: c1_MOP_TA1_P,
          2: c1_MOP_TA2_P,
          3: c1_MOP_TA3_P,
          4: c1_MOP_TA4_P,
          5: c1_MOP_TA5_P,
        },
        20: {
          TOT: c1_UREA_TOT_P,
          1: c1_UREA_TA1_P,
          2: c1_UREA_TA2_P,
          3: c1_UREA_TA3_P,
          4: c1_UREA_TA4_P,
          5: c1_UREA_TA5_P,
        },
      },
      3: {
        23: {
          TOT: c1_DAP_TOT_S,
          1: c1_DAP_TOT_S,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        },
        32: {
          TOT: c1_MOP_TOT_S,
          1: c1_MOP_TA1_S,
          2: c1_MOP_TA2_S,
          3: c1_MOP_TA3_S,
          4: c1_MOP_TA4_S,
          5: c1_MOP_TA5_S,
        },
        20: {
          TOT: c1_UREA_TOT_S,
          1: c1_UREA_TA1_S,
          2: c1_UREA_TA2_S,
          3: c1_UREA_TA3_S,
          4: c1_UREA_TA4_S,
          5: c1_UREA_TA5_S,
        },
      },

      104: {
        1: {
          25: {
            TOT: c2_SSP_TOT_A,
            1: c2_SSP_TOT_A,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
          },
          32: {
            TOT: c2_MOP_TOT_A,
            1: c2_MOP_TA1_A,
            2: c2_MOP_TA2_A,
            3: c2_MOP_TA3_A,
            4: c2_MOP_TA4_A,
            5: c2_MOP_TA5_A,
          },
          20: {
            TOT: c2_UREA_TOT_A,
            1: c2_UREA_TA1_A,
            2: c2_UREA_TA2_A,
            3: c2_UREA_TA3_A,
            4: c2_UREA_TA4_A,
            5: c2_UREA_TA5_A,
          },
        },
        2: {
          25: {
            TOT: c2_SSP_TOT_P,
            1: c2_SSP_TOT_P,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
          },
          32: {
            TOT: c2_MOP_TOT_P,
            1: c2_MOP_TA1_P,
            2: c2_MOP_TA2_P,
            3: c2_MOP_TA3_P,
            4: c2_MOP_TA4_P,
            5: c2_MOP_TA5_P,
          },
          20: {
            TOT: c2_UREA_TOT_P,
            1: c2_UREA_TA1_P,
            2: c2_UREA_TA2_P,
            3: c2_UREA_TA3_P,
            4: c2_UREA_TA4_P,
            5: c2_UREA_TA5_P,
          },
        },
        3: {
          25: {
            TOT: c2_SSP_TOT_S,
            1: c2_SSP_TOT_S,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
          },
          32: {
            TOT: c2_MOP_TOT_S,
            1: c2_MOP_TA1_S,
            2: c2_MOP_TA2_S,
            3: c2_MOP_TA3_S,
            4: c2_MOP_TA4_S,
            5: c2_MOP_TA5_S,
          },
          20: {
            TOT: c2_UREA_TOT_S,
            1: c2_UREA_TA1_S,
            2: c2_UREA_TA2_S,
            3: c2_UREA_TA3_S,
            4: c2_UREA_TA4_S,
            5: c2_UREA_TA5_S,
          },
        },
      },

      105: {
        1: {
          24: {
            TOT: c3_12_TOT_A,
            1: c3_12_TOT_A,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
          },
          32: {
            TOT: c3_MOP_TOT_A,
            1: c3_MOP_TA1_A,
            2: c3_MOP_TA2_A,
            3: c3_MOP_TA3_A,
            4: c3_MOP_TA4_A,
            5: c3_MOP_TA5_A,
          },
          20: {
            TOT: c3_UREA_TOT_A,
            1: c3_UREA_TA1_A,
            2: c3_UREA_TA2_A,
            3: c3_UREA_TA3_A,
            4: c3_UREA_TA4_A,
            5: c3_UREA_TA5_A,
          },
        },
        2: {
          24: {
            TOT: c3_12_TOT_P,
            1: c3_12_TOT_P,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
          },
          32: {
            TOT: c3_MOP_TOT_P,
            1: c3_MOP_TA1_P,
            2: c3_MOP_TA2_P,
            3: c3_MOP_TA3_P,
            4: c3_MOP_TA4_P,
            5: c3_MOP_TA5_P,
          },
          20: {
            TOT: c3_UREA_TOT_P,
            1: c3_UREA_TA1_P,
            2: c3_UREA_TA2_P,
            3: c3_UREA_TA3_P,
            4: c3_UREA_TA4_P,
            5: c3_UREA_TA5_P,
          },
        },
        3: {
          24: {
            TOT: c3_12_TOT_S,
            1: c3_12_TOT_S,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
          },
          32: {
            TOT: c3_MOP_TOT_S,
            1: c3_MOP_TA1_S,
            2: c3_MOP_TA2_S,
            3: c3_MOP_TA3_S,
            4: c3_MOP_TA4_S,
            5: c3_MOP_TA5_S,
          },
          20: {
            TOT: c3_UREA_TOT_S,
            1: c3_UREA_TA1_S,
            2: c3_UREA_TA2_S,
            3: c3_UREA_TA3_S,
            4: c3_UREA_TA4_S,
            5: c3_UREA_TA5_S,
          },
        },
      },

      106: {
        1: {
          22: {
            TOT: c4_10_TOT_A,
            1: c4_10_TOT_A,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
          },
          32: {
            TOT: c4_MOP_TOT_A,
            1: c4_MOP_TA1_A,
            2: c4_MOP_TA2_A,
            3: c4_MOP_TA3_A,
            4: c4_MOP_TA4_A,
            5: c4_MOP_TA5_A,
          },
          20: {
            TOT: c4_UREA_TOT_A,
            1: c4_UREA_TA1_A,
            2: c4_UREA_TA2_A,
            3: c4_UREA_TA3_A,
            4: c4_UREA_TA4_A,
            5: c4_UREA_TA5_A,
          },
        },
        2: {
          22: {
            TOT: c4_10_TOT_P,
            1: c4_10_TOT_P,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
          },
          32: {
            TOT: c4_MOP_TOT_P,
            1: c4_MOP_TA1_P,
            2: c4_MOP_TA2_P,
            3: c4_MOP_TA3_P,
            4: c4_MOP_TA4_P,
            5: c4_MOP_TA5_P,
          },
          20: {
            TOT: c4_UREA_TOT_P,
            1: c4_UREA_TA1_P,
            2: c4_UREA_TA2_P,
            3: c4_UREA_TA3_P,
            4: c4_UREA_TA4_P,
            5: c4_UREA_TA5_P,
          },
        },
        3: {
          22: {
            TOT: c4_10_TOT_S,
            1: c4_10_TOT_S,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
          },
          32: {
            TOT: c4_MOP_TOT_S,
            1: c4_MOP_TA1_S,
            2: c4_MOP_TA2_S,
            3: c4_MOP_TA3_S,
            4: c4_MOP_TA4_S,
            5: c4_MOP_TA5_S,
          },
          20: {
            TOT: c4_UREA_TOT_S,
            1: c4_UREA_TA1_S,
            2: c4_UREA_TA2_S,
            3: c4_UREA_TA3_S,
            4: c4_UREA_TA4_S,
            5: c4_UREA_TA5_S,
          },
        },
      },
    },
  };

  return recomm;
}
const data = calculations(8.33, 203, 117.9, 70, 50, 40);
// console.log(JSON.stringify(data, null, 2));
module.exports = { calculations };
