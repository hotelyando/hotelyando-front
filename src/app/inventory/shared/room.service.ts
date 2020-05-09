import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Response, ResponseList } from 'src/app/general/shared/response';
import { environment } from 'src/environments/environment';
import { Room, RoomType } from './room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(private http: HttpClient) {}

  save(room: Room): Observable<Room> {
    console.log('habitación a guardar', room);

    const url = `${environment.apiUrl}room`;
    let $service = this.http.post<any>(url, room);
    if (room.uuid) {
      $service = this.http.put<any>(url, room);
    }
    console.log('romtype to save -- ', room);

    return $service.pipe(
      switchMap((result) => of(result.content)),
      catchError((error) => throwError(error.error))
    );
  }

  saveType(roomType: RoomType): Observable<RoomType> {
    const url = `${environment.apiUrl}roomtype`;
    let $service = this.http.post<any>(url, roomType);
    if (roomType.uuid) {
      $service = this.http.put<any>(url, roomType);
    }
    return $service.pipe(
      switchMap((result) => of(result.content)),
      catchError((error) => throwError(error.error))
    );
  }

  delete(roomType: RoomType): Observable<void> {
    const url = `${environment.apiUrl}roomtype/${roomType.uuid}`;
    return this.http.delete<any>(url).pipe(catchError((error) => throwError(error.error)));
  }

  getRoomType(uuid: string): Observable<RoomType> {
    const url = environment.apiUrl;
    return this.http.get<Response<RoomType>>(`${url}roomtype/${uuid}`).pipe(switchMap((result) => of(result.content)));
  }

  getRoomTypes(): Observable<RoomType[]> {
    const url = environment.apiUrl;
    return this.http.get<ResponseList<RoomType>>(`${url}roomtype`).pipe(
      switchMap((data) => of(data.content)),
      catchError((error) => throwError(error.error))
    );
  }

  getRooms(): Observable<Room[]> {
    const url = environment.apiUrl;
    return this.http.get<ResponseList<Room>>(`${url}room`).pipe(
      switchMap((data) => of(data.content)),
      catchError((error) => throwError(error.error))
    );
  }
}
