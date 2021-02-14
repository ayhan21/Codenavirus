export class Statistics {
    public Day: number;
    public InfectedCount: number;
    public RecoveredCount: number;
    public HealthyCount: number;

    constructor(day: number, iCount: number, rCount: number, hCount: number) {
        this.Day = day;
        this.InfectedCount = iCount;
        this.RecoveredCount = rCount;
        this.HealthyCount = hCount;
    }
}