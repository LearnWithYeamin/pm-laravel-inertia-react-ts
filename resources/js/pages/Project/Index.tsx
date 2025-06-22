import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Project', href: '/project' }];

interface User {
    id: number;
    name: string;
    email: string;
}

interface Project {
    id: number;
    image_path: string;
    name: string;
    description: string;
    due_date: string;
    status: string;
    created_at: string;
    createdBy: User;
    updatedBy: User;
}

interface ProjectIndexProps {
    projects: {
        data: Project[];
        meta: {
            current_page: number;
            last_page: number;
            from: number;
            to: number;
            total: number;
            links: {
                url: string | null;
                label: string;
                active: boolean;
            }[];
        };
    };
}

export default function Index({ projects }: ProjectIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Project" />
            <div className="flex flex-col gap-4 overflow-x-auto p-4">
                {/* Table */}
                <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full min-w-[900px] text-left text-sm">
                        <thead className="bg-gray-100 text-xs uppercase text-center">
                            <tr>
                                <th className="border px-4 py-2">#</th>
                                <th className="border px-4 py-2">Image</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Created Date</th>
                                <th className="border px-4 py-2">Due Date</th>
                                <th className="border px-4 py-2">Created By</th>
                                <th className="border px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.data.map((project, index) => (
                                <tr key={project.id} className="hover:bg-gray-50 text-center">
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">
                                        <img src={project.image_path} alt={project.name} className="h-10 w-10 rounded object-cover" />
                                    </td>
                                    <td className="border px-4 py-2">{project.name}</td>
                                    <td className="border px-4 py-2">
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                                project.status === 'completed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : project.status === 'in_progress'
                                                      ? 'bg-yellow-100 text-yellow-800'
                                                      : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {project.status.replace('_', '')}
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2">{project.created_at}</td>
                                    <td className="border px-4 py-2">{project.due_date}</td>

                                    <td className="border px-4 py-2">
                                        {project.createdBy.name}
                                        <br />
                                        <span className="text-xs text-gray-500">{project.createdBy.email}</span>
                                    </td>

                                    {/* ✅ Action Buttons */}
                                    <td className="border px-4 py-2 whitespace-nowrap">
                                        <div className="flex gap-2">
                                            <Link href={route('project.edit', project.id)} className="text-sm text-blue-600 hover:underline">
                                                View
                                            </Link>
                                            <Link href={`/project/${project.id}/edit`} className="text-sm text-yellow-600 hover:underline">
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => confirm('Are you sure?') && console.log(`Delete ${project.id}`)}
                                                className="text-sm text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Info & Links */}
                <div className="mt-2 flex flex-col items-center justify-between gap-2 md:flex-row">
                    {/* Showing x to y of z */}
                    <div className="text-sm text-gray-600">
                        Showing <span className="font-medium">{projects.meta.from}</span> to <span className="font-medium">{projects.meta.to}</span>{' '}
                        of <span className="font-medium">{projects.meta.total}</span> results
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-2">
                        {projects.meta.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url ?? ''}
                                preserveScroll
                                className={`rounded border px-3 py-1 text-sm ${
                                    link.active ? 'border-blue-600 bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                                } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
