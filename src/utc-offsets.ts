export const UTCOffsetMap = {
  "-12:00": -720,
  "-11:00": -660,
  "-10:00": -600,
  "-09:30": -570,
  "-09:00": -540,
  "-08:00": -480,
  "-07:00": -420,
  "-06:00": -360,
  "-05:00": -300,
  "-04:00": -240,
  "-03:30": -210,
  "-03:00": -180,
  "-02:00": -120,
  "-01:00": -60,
  "+00:00": 0,
  "+01:00": 60,
  "+02:00": 120,
  "+03:00": 180,
  "+03:30": 210,
  "+04:00": 240,
  "+04:30": 270,
  "+05:00": 300,
  "+05:30": 330,
  "+05:45": 345,
  "+06:00": 360,
  "+06:30": 390,
  "+07:00": 420,
  "+08:00": 480,
  "+08:45": 525,
  "+09:00": 540,
  "+09:30": 570,
  "+10:00": 600,
  "+10:30": 630,
  "+11:00": 660,
  "+11:30": 690,
  "+12:00": 720,
  "+12:45": 765,
  "+13:00": 780,
  "+14:00": 840,
} as const;
export type UTCOffset = keyof typeof UTCOffsetMap;
export type UTCOffsetMinutes = typeof UTCOffsetMap[UTCOffset];

export function isValidUTCOffsetMinutes(m: number): m is UTCOffsetMinutes {
  return m >= -720 && m <= 840;
}

export function isValidUTCOffset(s: string): s is UTCOffset {
  return s in UTCOffsetMap;
}