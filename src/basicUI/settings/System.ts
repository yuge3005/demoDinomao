export class System {

  private mobile!: RegExpMatchArray | null;

  constructor() { }

  public isMobile(): boolean {
    if( this.mobile === undefined ){
      this.mobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    }
    return this.mobile != null;
  }
}
