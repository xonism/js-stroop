export class TimeFunctions {
    startTime;

    logTime = () => (Date.now() - this.startTime);

    restartTimer = () => this.startTime = Date.now();
};