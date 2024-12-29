import { Injectable } from '@angular/core';
import axios from 'axios';
import { Book } from './models/book.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly apiUrl = 'https://localhost:7268/api/Books';

  constructor() {}

  async getBooks(): Promise<Book[]> {
    try {
      const response = await axios.get<Book[]>(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }

  async addBook(book: Book): Promise<Book> {
    try {
      const response = await axios.post<Book>(this.apiUrl, book);
      return response.data;
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  }

  async updateBook(id: number, book: Book): Promise<Book> {
    try {
      const response = await axios.put<Book>(`${this.apiUrl}/${id}`, book);
      return response.data;
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  }

  async deleteBook(id: number): Promise<void> {
    try {
      await axios.delete(`${this.apiUrl}/${id}`);
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  }
}