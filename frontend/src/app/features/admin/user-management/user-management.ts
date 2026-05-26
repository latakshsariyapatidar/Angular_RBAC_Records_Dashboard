import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '@core/services/user.service';
import { User } from '@shared/interfaces/user.model';
import { Table } from '@shared/components/table/table';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, Table],
  templateUrl: './user-management.html',
  styleUrls: ['./user-management.scss'],
})
export class UserManagement {
  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);
  users: User[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  showCreateModal = false;
  showEditModal = false;
  showDeleteConfirm = false;

  createForm = {
    email: '',
    password: '',
    name: '',
  };

  editForm = {
    email: '',
    name: '',
  };

  selectedUser: User | null = null;
  userToDelete: User | null = null;
  isSubmitting = false;

  columns = [
    { label: 'Name', key: 'name', width: '150px' },
    { label: 'Email', key: 'email', width: '200px' },
    { label: 'Role', key: 'role', width: '120px' },
    { label: 'Actions', key: 'actions', width: '150px' },
  ];

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response.users;
        this.isLoading = false;
        this.cdr.detectChanges();
        console.log('Users loaded:', this.users);
      },
      error: (error) => {
        this.errorMessage = 'Failed to load users. Please try again.';
        this.isLoading = false;
        this.cdr.detectChanges();
        console.error('Error loading users:', error);
      },
    });
  }

  openCreateModal() {
    this.createForm = {
      email: '',
      password: '',
      name: '',
    };

    this.showCreateModal = true;
    this.errorMessage = '';
  }

  closeCreateModal() {
    this.showCreateModal = false;
    this.createForm = { email: '', password: '', name: '' };
  }

  createUser() {
    if (!this.createForm.email || !this.createForm.password || !this.createForm.name) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.userService.createUser(this.createForm).subscribe({
      next: (response) => {
        this.users.push(response.user);
        this.successMessage = 'User created successfully.';
        this.closeCreateModal();
        this.isSubmitting = false;
        this.cdr.detectChanges();

        setTimeout(() => (this.successMessage = ''), 3000);
      },
      error: (error) => {
        this.errorMessage = 'Failed to create user. Please try again.';
        this.isSubmitting = false;
        this.cdr.detectChanges();

        console.error('Error creating user:', error);
      },
    });
  }

  openEditModal(user: User) {
    this.selectedUser = user;
    this.editForm = { email: user.email, name: user.name };
    this.showEditModal = true;
    this.errorMessage = '';
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedUser = null;
    this.editForm = { email: '', name: '' };
  }

  updateUser() {
    if (!this.selectedUser || !this.editForm.email || !this.editForm.name) {
      this.errorMessage = 'All fields are required';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.userService.updateUser(this.selectedUser._id, this.editForm).subscribe({
      next: (response) => {
        // Update user in local list
        const index = this.users.findIndex((u) => u._id === response.user._id);
        if (index !== -1) {
          this.users[index] = response.user;
        }
        this.cdr.detectChanges();

        this.successMessage = `User "${response.user.name}" updated successfully`;
        this.closeEditModal();
        this.isSubmitting = false;
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error.error?.message || 'Failed to update user';
        this.cdr.detectChanges();

        console.error('Error updating user:', error);
      },
    });
  }

  openDeleteConfirm(user: User) {
    this.userToDelete = user;
    this.showDeleteConfirm = true;
    this.errorMessage = '';
  }

  closeDeleteConfirm() {
    this.showDeleteConfirm = false;
    this.userToDelete = null;
  }

  deleteUser() {
    if (!this.userToDelete) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    this.userService.deleteUser(this.userToDelete._id).subscribe({
      next: (response) => {
        // Remove user from local list
        this.users = this.users.filter((u) => u._id !== this.userToDelete?._id);
        this.successMessage = `User deleted successfully`;
        this.closeDeleteConfirm();
        this.isSubmitting = false;
        this.cdr.detectChanges();

        setTimeout(() => (this.successMessage = ''), 3000);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error.error?.message || 'Failed to delete user';
        this.cdr.detectChanges();
        console.error('Error deleting user:', error);
      },
    });
  }
}
