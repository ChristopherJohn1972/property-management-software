import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Outlet } from "react-router-dom"
import "./index.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="properties" element={<PropertiesPage />} />
          <Route path="tenants" element={<TenantsPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

// ========== LANDING PAGE ==========
function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <h1 className="display-4 fw-bold mb-4">
              Property Management <span className="text-primary">Made Simple</span>
            </h1>
            <p className="lead mb-4">
              Streamline your property management with our all-in-one solution. 
              Track rentals, manage tenants, and handle payments effortlessly.
            </p>
            <div className="d-flex gap-3">
              <button className="btn btn-primary btn-lg px-4" onClick={() => navigate("/login")}>
                Get Started
              </button>
              <button className="btn btn-outline-primary btn-lg px-4" onClick={() => navigate("/register")}>
                Create Account
              </button>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <h3 className="h4 mb-4">Why Choose Our System?</h3>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>Easy Tenant Management</strong> - Track all tenant information in one place
                  </li>
                  <li className="mb-3">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>Automated Rent Collection</strong> - Set up recurring payments and reminders
                  </li>
                  <li className="mb-3">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>Maintenance Tracking</strong> - Handle repair requests efficiently
                  </li>
                  <li className="mb-3">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>Financial Reports</strong> - Generate detailed income and expense reports
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ========== LOGIN PAGE ==========
function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/dashboard")
  }

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">Welcome Back</h2>
                  <p className="text-muted">Sign in to your account</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  
                  <button type="submit" className="btn btn-primary w-100 btn-lg">
                    Sign In
                  </button>
                </form>
                
                <div className="text-center mt-4">
                  <p className="text-muted">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-decoration-none">
                      Sign up here
                    </Link>
                  </p>
                  <p className="text-muted">
                    <Link to="/" className="text-decoration-none">
                      ← Back to home
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ========== REGISTER PAGE ==========
function RegisterPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/dashboard")
  }

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-7">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">Create Your Account</h2>
                  <p className="text-muted">Start managing your properties today</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="terms" required />
                    <label className="form-check-label" htmlFor="terms">
                      I agree to the Terms of Service and Privacy Policy
                    </label>
                  </div>
                  
                  <button type="submit" className="btn btn-primary w-100 btn-lg">
                    Create Account
                  </button>
                </form>
                
                <div className="text-center mt-4">
                  <p className="text-muted">
                    Already have an account?{" "}
                    <Link to="/login" className="text-decoration-none">
                      Sign in here
                    </Link>
                  </p>
                  <p className="text-muted">
                    <Link to="/" className="text-decoration-none">
                      ← Back to home
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ========== DASHBOARD LAYOUT ==========
function DashboardLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      navigate("/")
    }
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3" to="/dashboard">
            <i className="fas fa-tachometer-alt me-2"></i>Dashboard
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#dashboardNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="dashboardNav">
            <div className="navbar-nav ms-auto">
              <Link className="nav-link" to="/dashboard">Home</Link>
              <Link className="nav-link" to="/dashboard/properties">Properties</Link>
              <Link className="nav-link" to="/dashboard/tenants">Tenants</Link>
              <Link className="nav-link" to="/dashboard/payments">Payments</Link>
              <Link className="nav-link" to="/dashboard/reports">Reports</Link>
              <Link className="nav-link" to="/dashboard/settings">Settings</Link>
              <button className="btn btn-outline-light ms-3" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt me-1"></i>Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <Outlet />
      </div>
    </div>
  )
}

// ========== DASHBOARD PAGE ==========
function DashboardPage() {
  return (
    <div>
      <h1 className="h2 mb-4">Dashboard Overview</h1>
      
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">Total Properties</h5>
              <h3 className="card-text">12</h3>
              <p className="card-text small">2 vacant units</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Active Tenants</h5>
              <h3 className="card-text">24</h3>
              <p className="card-text small">All current tenants</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Monthly Revenue</h5>
              <h3 className="card-text">$12,500</h3>
              <p className="card-text small">This month</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <h5 className="card-title">Pending Tasks</h5>
              <h3 className="card-text">5</h3>
              <p className="card-text small">Require attention</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title">Recent Activity</h5>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Activity</th>
                  <th>Property</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2024-01-15</td>
                  <td>Rent Payment - John Doe</td>
                  <td>Sunrise Apartments</td>
                  <td><span className="badge bg-success">Completed</span></td>
                </tr>
                <tr>
                  <td>2024-01-14</td>
                  <td>Maintenance Request</td>
                  <td>Green Valley Houses</td>
                  <td><span className="badge bg-warning">Pending</span></td>
                </tr>
                <tr>
                  <td>2024-01-13</td>
                  <td>New Tenant Application</td>
                  <td>Sunrise Apartments</td>
                  <td><span className="badge bg-info">Under Review</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

// ========== PROPERTIES PAGE ==========
function PropertiesPage() {
  const [properties, setProperties] = useState([
    { id: 1, name: "Sunrise Apartments", address: "123 Main St, Nairobi", units: 8, status: "Active" },
    { id: 2, name: "Green Valley Houses", address: "456 Park Ave, Mombasa", units: 4, status: "Maintenance" }
  ])
  
  const [showModal, setShowModal] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    units: "",
    status: "Active"
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingProperty) {
      // Update existing property
      setProperties(properties.map(p => 
        p.id === editingProperty.id ? { ...formData, id: editingProperty.id } : p
      ))
    } else {
      // Add new property
      const newProperty = {
        ...formData,
        id: properties.length + 1
      }
      setProperties([...properties, newProperty])
    }
    setShowModal(false)
    resetForm()
  }

  const handleEdit = (property) => {
    setEditingProperty(property)
    setFormData({
      name: property.name,
      address: property.address,
      units: property.units,
      status: property.status
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      setProperties(properties.filter(p => p.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      units: "",
      status: "Active"
    })
    setEditingProperty(null)
  }

  const handleAddNew = () => {
    resetForm()
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    resetForm()
  }

  return (
    <div>
      <h1 className="h2 mb-4">Properties Management</h1>
      
      <div className="card shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h5 className="card-title mb-0">Properties List</h5>
              <p className="text-muted mb-0">Manage all your properties</p>
            </div>
            <button className="btn btn-primary" onClick={handleAddNew}>
              <i className="fas fa-plus me-1"></i> Add New Property
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Property Name</th>
                  <th>Address</th>
                  <th>Units</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map(property => (
                  <tr key={property.id}>
                    <td>{property.name}</td>
                    <td>{property.address}</td>
                    <td>{property.units}</td>
                    <td>
                      <span className={`badge ${property.status === 'Active' ? 'bg-success' : 'bg-warning'}`}>
                        {property.status}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <button 
                          className="btn btn-sm btn-outline-primary me-1"
                          onClick={() => handleEdit(property)}
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(property.id)}
                          title="Delete"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-info ms-1"
                          title="View Details"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 text-muted">
            Showing {properties.length} properties
          </div>
        </div>
      </div>

      {/* Add/Edit Property Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingProperty ? 'Edit Property' : 'Add New Property'}
                </h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Property Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Number of Units</label>
                    <input
                      type="number"
                      className="form-control"
                      name="units"
                      value={formData.units}
                      onChange={handleChange}
                      required
                      min="1"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Vacant">Vacant</option>
                      <option value="Under Renovation">Under Renovation</option>
                    </select>
                  </div>
                  
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingProperty ? 'Update Property' : 'Add Property'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ========== TENANTS PAGE WITH CRUD ==========
function TenantsPage() {
  const [tenants, setTenants] = useState([
    { 
      id: 1, 
      name: "John Doe", 
      email: "john@example.com",
      phone: "0712 345 678",
      property: "Sunrise Apartments", 
      unit: "A101", 
      rentDue: 500, 
      status: "Current",
      leaseStart: "2024-01-01",
      leaseEnd: "2024-12-31"
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "jane@example.com",
      phone: "0713 456 789",
      property: "Green Valley Houses", 
      unit: "B202", 
      rentDue: 750, 
      status: "Overdue",
      leaseStart: "2024-01-15",
      leaseEnd: "2024-12-15"
    }
  ])
  
  const [showModal, setShowModal] = useState(false)
  const [editingTenant, setEditingTenant] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    property: "",
    unit: "",
    rentDue: "",
    status: "Current",
    leaseStart: "",
    leaseEnd: ""
  })

  const properties = ["Sunrise Apartments", "Green Valley Houses", "Ocean View Villas", "Mountain Ridge Condos"]
  const statusOptions = ["Current", "Overdue", "Vacating", "On Notice", "New"]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingTenant) {
      // Update existing tenant
      setTenants(tenants.map(t => 
        t.id === editingTenant.id ? { ...formData, id: editingTenant.id } : t
      ))
    } else {
      // Add new tenant
      const newTenant = {
        ...formData,
        id: tenants.length + 1
      }
      setTenants([...tenants, newTenant])
    }
    setShowModal(false)
    resetForm()
  }

  const handleEdit = (tenant) => {
    setEditingTenant(tenant)
    setFormData({
      name: tenant.name,
      email: tenant.email,
      phone: tenant.phone,
      property: tenant.property,
      unit: tenant.unit,
      rentDue: tenant.rentDue,
      status: tenant.status,
      leaseStart: tenant.leaseStart,
      leaseEnd: tenant.leaseEnd
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tenant?")) {
      setTenants(tenants.filter(t => t.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      property: "",
      unit: "",
      rentDue: "",
      status: "Current",
      leaseStart: "",
      leaseEnd: ""
    })
    setEditingTenant(null)
  }

  const handleAddNew = () => {
    resetForm()
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    resetForm()
  }

  const getStatusBadge = (status) => {
    const badges = {
      "Current": "bg-success",
      "Overdue": "bg-danger",
      "Vacating": "bg-warning",
      "On Notice": "bg-info",
      "New": "bg-primary"
    }
    return badges[status] || "bg-secondary"
  }

  return (
    <div>
      <h1 className="h2 mb-4">Tenants Management</h1>
      
      <div className="card shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h5 className="card-title mb-0">Tenants List</h5>
              <p className="text-muted mb-0">Manage all your tenants and lease agreements</p>
            </div>
            <button className="btn btn-primary" onClick={handleAddNew}>
              <i className="fas fa-user-plus me-1"></i> Add New Tenant
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Tenant Name</th>
                  <th>Contact</th>
                  <th>Property</th>
                  <th>Unit</th>
                  <th>Rent Due</th>
                  <th>Status</th>
                  <th>Lease Period</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map(tenant => (
                  <tr key={tenant.id}>
                    <td>
                      <strong>{tenant.name}</strong>
                    </td>
                    <td>
                      <div>{tenant.email}</div>
                      <small className="text-muted">{tenant.phone}</small>
                    </td>
                    <td>{tenant.property}</td>
                    <td>{tenant.unit}</td>
                    <td>${tenant.rentDue}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(tenant.status)}`}>
                        {tenant.status}
                      </span>
                    </td>
                    <td>
                      {tenant.leaseStart} to {tenant.leaseEnd}
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <button 
                          className="btn btn-sm btn-outline-primary me-1"
                          onClick={() => handleEdit(tenant)}
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(tenant.id)}
                          title="Delete"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-info ms-1"
                          title="View Details"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-warning ms-1"
                          title="Send Reminder"
                        >
                          <i className="fas fa-bell"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 text-muted">
            Showing {tenants.length} tenants
          </div>
        </div>
      </div>

      {/* Add/Edit Tenant Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingTenant ? 'Edit Tenant' : 'Add New Tenant'}
                </h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Property</label>
                      <select
                        className="form-select"
                        name="property"
                        value={formData.property}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Property</option>
                        {properties.map(property => (
                          <option key={property} value={property}>{property}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Unit Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Monthly Rent ($)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="rentDue"
                        value={formData.rentDue}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Lease Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="leaseStart"
                        value={formData.leaseStart}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Lease End Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="leaseEnd"
                        value={formData.leaseEnd}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingTenant ? 'Update Tenant' : 'Add Tenant'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ========== PAYMENTS PAGE ==========
function PaymentsPage() {
  return (
    <div>
      <h1 className="h2 mb-4">Payments Management</h1>
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title">Payment History</h5>
          <p>Track all rent payments and expenses.</p>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Tenant</th>
                  <th>Property</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2024-01-01</td>
                  <td>John Doe</td>
                  <td>Sunrise Apartments</td>
                  <td>$500.00</td>
                  <td>Rent</td>
                  <td><span className="badge bg-success">Paid</span></td>
                </tr>
                <tr>
                  <td>2024-01-05</td>
                  <td>Jane Smith</td>
                  <td>Green Valley Houses</td>
                  <td>$750.00</td>
                  <td>Rent</td>
                  <td><span className="badge bg-danger">Overdue</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">Total Collected</h6>
                  <h3 className="text-success">$12,500.00</h3>
                  <p className="text-muted small">This month</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">Pending</h6>
                  <h3 className="text-warning">$3,240.00</h3>
                  <p className="text-muted small">Awaiting payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ========== REPORTS PAGE WITH GENERATABLE REPORTS ==========
function ReportsPage() {
  const [generatedReport, setGeneratedReport] = useState(null)
  const [reportType, setReportType] = useState("")
  const [dateRange, setDateRange] = useState({
    start: "2024-01-01",
    end: "2024-01-31"
  })

  const generateReport = (type) => {
    setReportType(type)
    
    // Simulate API call/processing
    setTimeout(() => {
      const reports = {
        "income": {
          title: "Income Statement Report",
          data: {
            totalRevenue: 12500,
            collected: 9250,
            pending: 3250,
            expenses: 4200,
            netIncome: 8300,
            details: [
              { category: "Rent", amount: 11000 },
              { category: "Late Fees", amount: 1500 },
              { category: "Utilities", amount: -3000 },
              { category: "Maintenance", amount: -1200 }
            ]
          }
        },
        "expense": {
          title: "Expense Report",
          data: {
            totalExpenses: 4200,
            categories: [
              { name: "Maintenance", amount: 1200, percentage: 28.6 },
              { name: "Utilities", amount: 3000, percentage: 71.4 }
            ],
            monthlyTrend: [3200, 2800, 3500, 4200]
          }
        },
        "occupancy": {
          title: "Occupancy Report",
          data: {
            totalUnits: 12,
            occupied: 10,
            vacant: 2,
            occupancyRate: 83.3,
            properties: [
              { name: "Sunrise Apartments", occupied: 8, total: 8, rate: 100 },
              { name: "Green Valley Houses", occupied: 2, total: 4, rate: 50 }
            ]
          }
        }
      }
      
      setGeneratedReport(reports[type])
    }, 1000)
  }

  const downloadReport = () => {
    if (!generatedReport) return
    
    const reportData = {
      title: generatedReport.title,
      dateRange: dateRange,
      generatedOn: new Date().toISOString().split('T')[0],
      data: generatedReport.data
    }
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${reportType}-report-${dateRange.start}-to-${dateRange.end}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    alert(`Report downloaded as ${a.download}`)
  }

  const printReport = () => {
    window.print()
  }

  const handleDateChange = (e) => {
    setDateRange({
      ...dateRange,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <h1 className="h2 mb-4">Reports & Analytics</h1>
      
      <div className="card shadow mb-4">
        <div className="card-body">
          <h5 className="card-title">Report Parameters</h5>
          <div className="row align-items-end">
            <div className="col-md-4 mb-3">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                name="start"
                value={dateRange.start}
                onChange={handleDateChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                name="end"
                value={dateRange.end}
                onChange={handleDateChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <button 
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setDateRange({
                    start: "2024-01-01",
                    end: "2024-01-31"
                  })
                  setGeneratedReport(null)
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title">Generate Reports</h5>
          <p>Generate and view detailed reports for the selected period.</p>

          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body text-center">
                  <i className="fas fa-chart-bar text-primary fs-1 mb-3"></i>
                  <h5>Income Statement</h5>
                  <p className="text-muted small">Revenue, expenses, and net income</p>
                  <button 
                    className="btn btn-outline-primary btn-sm mt-2"
                    onClick={() => generateReport("income")}
                    disabled={generatedReport && reportType === "income"}
                  >
                    {generatedReport && reportType === "income" ? "Generating..." : "Generate"}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body text-center">
                  <i className="fas fa-chart-pie text-success fs-1 mb-3"></i>
                  <h5>Expense Report</h5>
                  <p className="text-muted small">Breakdown of all expenses</p>
                  <button 
                    className="btn btn-outline-success btn-sm mt-2"
                    onClick={() => generateReport("expense")}
                    disabled={generatedReport && reportType === "expense"}
                  >
                    {generatedReport && reportType === "expense" ? "Generating..." : "Generate"}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body text-center">
                  <i className="fas fa-chart-line text-info fs-1 mb-3"></i>
                  <h5>Occupancy Report</h5>
                  <p className="text-muted small">Property occupancy rates</p>
                  <button 
                    className="btn btn-outline-info btn-sm mt-2"
                    onClick={() => generateReport("occupancy")}
                    disabled={generatedReport && reportType === "occupancy"}
                  >
                    {generatedReport && reportType === "occupancy" ? "Generating..." : "Generate"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Generated Report Display */}
          {generatedReport && (
            <div className="mt-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>{generatedReport.title}</h5>
                <div>
                  <button className="btn btn-sm btn-outline-success me-2" onClick={downloadReport}>
                    <i className="fas fa-download me-1"></i> Download
                  </button>
                  <button className="btn btn-sm btn-outline-primary" onClick={printReport}>
                    <i className="fas fa-print me-1"></i> Print
                  </button>
                </div>
              </div>
              
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h6>Report Period: {dateRange.start} to {dateRange.end}</h6>
                      <p className="text-muted">Generated on: {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="col-md-6 text-end">
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setGeneratedReport(null)}
                      >
                        Clear Report
                      </button>
                    </div>
                  </div>
                  
                  {/* Income Report Display */}
                  {reportType === "income" && (
                    <div className="mt-3">
                      <div className="row">
                        <div className="col-md-3">
                          <div className="card bg-light">
                            <div className="card-body">
                              <h6 className="card-title">Total Revenue</h6>
                              <h4 className="text-success">${generatedReport.data.totalRevenue.toLocaleString()}</h4>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="card bg-light">
                            <div className="card-body">
                              <h6 className="card-title">Collected</h6>
                              <h4 className="text-primary">${generatedReport.data.collected.toLocaleString()}</h4>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="card bg-light">
                            <div className="card-body">
                              <h6 className="card-title">Pending</h6>
                              <h4 className="text-warning">${generatedReport.data.pending.toLocaleString()}</h4>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="card bg-light">
                            <div className="card-body">
                              <h6 className="card-title">Net Income</h6>
                              <h4 className="text-success">${generatedReport.data.netIncome.toLocaleString()}</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <table className="table table-sm mt-3">
                        <thead>
                          <tr>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {generatedReport.data.details.map((item, index) => (
                            <tr key={index}>
                              <td>{item.category}</td>
                              <td className={item.amount >= 0 ? "text-success" : "text-danger"}>
                                ${Math.abs(item.amount).toLocaleString()}
                              </td>
                              <td>
                                <span className={`badge ${item.amount >= 0 ? "bg-success" : "bg-danger"}`}>
                                  {item.amount >= 0 ? "Revenue" : "Expense"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  
                  {/* Expense Report Display */}
                  {reportType === "expense" && (
                    <div className="mt-3">
                      <h6>Total Expenses: ${generatedReport.data.totalExpenses.toLocaleString()}</h6>
                      <div className="row mt-3">
                        {generatedReport.data.categories.map((category, index) => (
                          <div className="col-md-6 mb-3" key={index}>
                            <div className="card">
                              <div className="card-body">
                                <h6>{category.name}</h6>
                                <div className="progress">
                                  <div 
                                    className="progress-bar bg-success" 
                                    style={{ width: `${category.percentage}%` }}
                                  >
                                    {category.percentage}%
                                  </div>
                                </div>
                                <p className="mt-2 mb-0">${category.amount.toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Occupancy Report Display */}
                  {reportType === "occupancy" && (
                    <div className="mt-3">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="card bg-light">
                            <div className="card-body">
                              <h6 className="card-title">Total Units</h6>
                              <h4>{generatedReport.data.totalUnits}</h4>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="card bg-light">
                            <div className="card-body">
                              <h6 className="card-title">Occupied</h6>
                              <h4 className="text-success">{generatedReport.data.occupied}</h4>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="card bg-light">
                            <div className="card-body">
                              <h6 className="card-title">Occupancy Rate</h6>
                              <h4 className="text-info">{generatedReport.data.occupancyRate}%</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <table className="table table-sm mt-3">
                        <thead>
                          <tr>
                            <th>Property</th>
                            <th>Occupied Units</th>
                            <th>Total Units</th>
                            <th>Occupancy Rate</th>
                          </tr>
                        </thead>
                        <tbody>
                          {generatedReport.data.properties.map((property, index) => (
                            <tr key={index}>
                              <td>{property.name}</td>
                              <td>{property.occupied}</td>
                              <td>{property.total}</td>
                              <td>
                                <span className="badge bg-info">{property.rate}%</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ========== SETTINGS PAGE ==========
function SettingsPage() {
  return (
    <div>
      <h1 className="h2 mb-4">Settings</h1>
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title">Account Settings</h5>
          <p>Manage your account preferences and configuration.</p>

          <div className="mb-4">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" value="admin@example.com" readOnly />
          </div>

          <div className="mb-4">
            <label className="form-label">Notification Preferences</label>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="emailNotifications" defaultChecked />
              <label className="form-check-label" htmlFor="emailNotifications">
                Email notifications
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="paymentReminders" defaultChecked />
              <label className="form-check-label" htmlFor="paymentReminders">
                Payment reminders
              </label>
            </div>
          </div>

          <button className="btn btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  )
}

export default App
