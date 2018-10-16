import { HttpClient } from "@angular/common/http";


describe('workspace-project App', () => {
    let service: HttpClient;
    let url = 'http://localhost:3000/events';
  
    it('should reach the events', () => {
      service.get(url).subscribe(res => {
        expect(res[0].title).toBeDefined();
      });
    });
  
    it('should receive a title of a event', () => {
      service.get(url).subscribe(res => {
        expect(res[0].title).toEqual('Aniversário');
      })
    });
  });