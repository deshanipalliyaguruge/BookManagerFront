import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from './data.service';
import { Book } from './models/book.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class AppComponent implements OnInit {
  books: Book[] = [];
  loading = false;
  error: string | null = null;
  isEditing = false;
  isPopupOpen = false;

  newBook: Book = {
    id: 0,
    title: '',
    author: '',
    isbn: '',
    publicationDate: ''
  };

  constructor(private dataService: DataService) {}

  async ngOnInit() {
    await this.loadBooks();
  }

  async loadBooks() {
    try {
      this.loading = true;
      this.books = await this.dataService.getBooks();
      this.error = null;
    } catch (error) {
      this.error = 'Failed to load books';
    } finally {
      this.loading = false;
    }
  }

  async onSubmit() {
    try {
      if (this.isEditing) {
        await this.dataService.updateBook(this.newBook.id, this.newBook);
      } else {
        await this.dataService.addBook(this.newBook);
      }
      await this.loadBooks();
      this.resetForm();
      this.closePopup();
      this.error = null;
    } catch (error) {
      this.error = this.isEditing ? 'Failed to update book' : 'Failed to add book';
    }
  }

  startEdit(book: Book) {
    this.isEditing = true;
    this.newBook = { ...book };
    this.openPopup();
  }

  async deleteBook(id: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      try {
        await this.dataService.deleteBook(id);
        await this.loadBooks();
        this.error = null;
      } catch (error) {
        this.error = 'Failed to delete book';
      }
    }
  }

  resetForm() {
    this.isEditing = false;
    this.newBook = {
      id: 0,
      title: '',
      author: '',
      isbn: '',
      publicationDate: ''
    };
    this.error = null;
  }

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
    this.resetForm();
  }

  viewBookDetails(book: Book) {
    alert(
      `Book Details:\n
        Title: ${book.title}\n
        Author: ${book.author}\n
        ISBN: ${book.isbn}\n
        Publication Date: ${book.publicationDate}`
    );
  }
}
