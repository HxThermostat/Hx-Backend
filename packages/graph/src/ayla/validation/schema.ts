import * as z from "zod";

export const DeviceSchema = z.object({
  key: z.number(),
  "connection_status": z.string(),
  dsn: z.string(),
  lat: z.string(),
  lng: z.string(),
  "oem_model": z.string(),
  "product_name": z.string().optional(),
  "template_id": z.number().optional(),
  "user_uuid": z.string(),
});

// These are mostly zoned properties with trailing numbers
// TODO: Away zones; AwayZn#
// TODO: Cool Setpoints; ClStept#
// TODO: ?; DHStg#
// TODO: Fan Settings: FanStg#
// TODO: Heat setpoints; HtStpt#
// TODO: Humidity; Hum#
// TODO: Humidity setting; HumStg#
// TODO: IDTmps ?; IDTmp#
// TODO: OverrideStg ?; OverrideStgZn#
// TODO: Sch1p1 ?
// TODO: SchDayParts
// TODO: SchFan
// TODO: SchStpts
// TODO: TmpOvr
// TODO: UsrMd
// TODO: usrMdPrev
// TODO: versionZn#
// TODO: ZnAirflow
// TODO: ZnSensor
// TODO: ZnStat
// TODO: ZoneName
export const DevicePropertiesSchema = z.object({
  ActiveSystemAirflow: z.number(),
  Brand: z.string(),
  ClStptMin: z.number(),
  ClStptMax: z.number(),
  Deadband: z.number(),
  dlrEmail: z.string().optional(),
  dlrName: z.string().optional(),
  dlrPhone: z.string().optional(),
  dlrWeb: z.string().optional(),
  EquipOut: z.number(),
  FanOvrSt: z.number(),
  Fault: z.string().optional(),
  ForcedAirflowTest: z.number(),
  HtStptMin: z.number(),
  HtStptMax: z.number(),
  MinAirflow: z.number(),
  MaxAirflow: z.number(),
  ODTmp: z.number(),
  ODTmpServer: z.number(),
  ServiceDates: z.string(),
  SysStg: z.number(),
  TmpOvrSt: z.number(),
  Vacation: z.string().optional(),
  version: z.string().optional(),
  versionBt: z.string().optional(),
  versionOD: z.string().optional(),
  versionZC1: z.string().optional(),
  versionZC2: z.string().optional(),
});
