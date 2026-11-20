import api from "../api";

const resourcePath = (resource) => `/admin/${resource}`;

const userToApi = (record) => ({
  name: record.name,
  mobile: record.mobile,
  email: record.email || null,
  role: record.role,
  ...(record.password ? { password: record.password } : {}),
});

export async function listAdminRecords(resource, { page, perPage, search, signal }) {
  const response = await api.get(resourcePath(resource), {
    params: {
      page,
      per_page: perPage,
      ...(search ? { q: search } : {}),
    },
    signal,
  });

  return response.data;
}

export async function saveAdminRecord(resource, record, id) {
  const payload = resource === "users" ? userToApi(record) : record;
  const response = id
    ? await api.put(`${resourcePath(resource)}/${id}`, payload)
    : await api.post(resourcePath(resource), payload);

  return response.data;
}

export async function deleteAdminRecord(resource, id) {
  await api.delete(`${resourcePath(resource)}/${id}`);
}

export async function uploadAdminImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  const response = await api.post("/admin/uploads/images", formData);
  return response.data.data;
}
