// src/components/client/AdminUserSelector.tsx
'use client';

import { User } from "@/db/schema";

interface AdminUserSelectorProps {
  users: User[];
  initialUserId: string;
  onUserSelect: (userId: string) => void;
}

export function AdminUserSelector({
  users,
  initialUserId,
  onUserSelect,
}: AdminUserSelectorProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">View posts for:</label>
      <select
        defaultValue={initialUserId}
        onChange={(e) => onUserSelect(e.target.value)}
        className="border rounded px-3 py-2"
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
}