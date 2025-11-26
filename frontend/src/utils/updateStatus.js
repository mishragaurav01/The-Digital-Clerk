export const updateRequestStatus = async (id, status, token, extraFields = {}) => {
  try {
    // 🧠 Define how admin_review.status maps to final_status
    let finalStatus = status; // default

    if (status === "approved") finalStatus = "in_progress";
    else if (status === "assigned") finalStatus = "in_progress";
    else if (status === "rejected") finalStatus = "rejected";
    else if (status === "pending") finalStatus = "pending";
    else if (status === "completed") finalStatus = "completed";

    const payload = {
      admin_review: { status },
      final_status: finalStatus,
      ...extraFields, // in case you want to send more dynamic data later
    };

    console.log("📦 Sending payload:", payload);
// http://localhost:5000/api/
// http://localhost:5000/api/
    const response = await fetch(`http://localhost:5000/api/estamp/update-status/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error:", errorText);
      throw new Error(`Server returned ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("⚠️ Error updating status:", error);
    throw error;
  }
};
