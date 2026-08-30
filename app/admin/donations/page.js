import dbConnect from "@/lib/db";
import Donation from "@/models/Donation";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Donations - VIDO Admin",
};

export default async function AdminDonationsPage() {
  await dbConnect();
  const donations = await Donation.find({}).sort({ createdAt: -1 }).lean();
  const total = donations.reduce((sum, d) => sum + (d.amount || 0), 0);

  return (
    <div>
      <div className="admin-page-header">
        <h1>Donations</h1>
      </div>

      <div className="admin-card-grid mt-4">
        <div className="admin-stat-card">
          <span className="stat-number">${total.toLocaleString()}</span>
          <span className="stat-label">Total Raised</span>
        </div>
        <div className="admin-stat-card">
          <span className="stat-number">{donations.length}</span>
          <span className="stat-label">Donations</span>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Donor</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {donations.length === 0 && (
            <tr>
              <td colSpan={6}>No donations yet.</td>
            </tr>
          )}
          {donations.map((d) => (
            <tr key={d._id.toString()}>
              <td>{d.donorName}</td>
              <td>{d.email}</td>
              <td>${d.amount}</td>
              <td>{d.method}</td>
              <td>{d.status}</td>
              <td>{formatDate(d.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
