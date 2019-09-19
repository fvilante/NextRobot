

export interface LinearAxisClassic  {
    readonly pulsesPerMotorRevolution: 200 | 400, // pulsos por volta do motor
    readonly teethOnTheMotorPulley: 12 | 16 | 20, // numero de dentes da polia do motor
    readonly beltStepInMilimeters: 5.08,          // passo da correia dentada em milimetros
}

export const LinearAxisClassic = (_: LinearAxisClassic): LinearAxisClassic => _


export type PhysicalArm = LinearAxisClassic