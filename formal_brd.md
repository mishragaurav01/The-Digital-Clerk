# Business Requirement Document (BRD)

## 1. Document Information
**Document Title:** Business Requirement Document (BRD) – The Digital Clerk Service Expansion  
**Version:** 1.0  
**Prepared By:** Senior Business Analyst  
**Date:** March 13, 2026  

## 2. Project Overview
The Digital Clerk is a service procurement platform that digitizes and simplifies the process of obtaining legal and business documents such as e-Stamps, Company Registration, GST Registration, MSME Registration, Notary Services, and Document Sign-in Requests. Originally focused on e-Stamps, the system is expanding into a multi-sided marketplace to support diverse business services. The platform bridges the gap between customers needing essential legal documents and verified vendor professionals capable of executing those requests rapidly and securely.

## 3. Business Objectives
- **Expand Service Catalog:** Introduce support for five new service areas (Company Registration, GST Registration, MSME Registration, Notary Services, Document Sign-in Requests).
- **Vendor Diversification & Scalability:** Move from a single lawyer pool to a diversified, multi-vendor onboarding system capable of handling increased fulfillment volume.
- **Optimize Task Distribution:** Implement dynamic assignment rules (Auto, Manual, and Queue-based) strictly governed by the type of service requested to reduce turnaround times.
- **Secure Financial Transactions:** Integrate Razorpay for upfront customer payments with a built-in admin-controlled payout release mechanism to guarantee service quality before vendors are compensated.

## 4. Stakeholders
- **Executive Management / Platform Owners:** Sponsoring the strategic expansion and monitoring platform revenue.
- **Operations & Admin Team:** Managing daily workflows, resolving disputes, executing QA, and releasing vendor payouts.
- **Customers (B2B and B2C):** End-users requesting and paying for services.
- **Vendors / Service Providers (including Lawyers):** Legal and registration professionals fulfilling customer requests.

## 5. User Roles and Responsibilities
- **Customer:** An individual or business entity that registers on the platform, submits service requests, uploads necessary antecedent documents, makes payments via Razorpay, tracks order status, and downloads completed deliverables from their dashboard.
- **Admin:** The operational overseer responsible for reviewing incoming customer requests, manually assigning specific requests to vendors (when applicable), verifying uploaded documents from vendors, confirming satisfaction offline with clients, and manually triggering financial payouts to vendors.
- **Vendor:** A verified service provider onboarded to the platform. They access a dedicated dashboard to view queues for their approved services, accept or receive assigned tasks, perform the requested work offline, and upload the finalized deliverables to the platform for Admin review.

## 6. Scope of the System

**In Scope:**
- Creation of a vendor onboarding and tracking system.
- Addition of new intake workflows for Company Registration, GST Registration, MSME Registration, Notary Services, and Document Sign-in Requests.
- Implementation of dynamic vendor assignment logic (Auto, Manual, and FCFS Queue).
- Integration of Razorpay payment gateway to accept upfront payments post-service completion.
- Development of an admin-controlled payout release mechanism mapping to specific commission splits.

**Out of Scope:**
- Direct, decentralized peer-to-peer messaging between Customers and Vendors without Admin oversight.
- Automated API-driven procurements directly from government portals.
- Integration with third-party HR or massive ERP applications.

## 7. Functional Requirements
- **User Request Creation:** Customers must be able to select from a catalog of distinct services and fill out service-specific forms, accompanied by document upload capabilities for ID proofs or prerequisites.
- **Vendor Onboarding:** The system must allow multiple vendors to be onboarded. Admins must be able to approve vendors and assign them specific "Service Capability Tags" which dictate the requests they can fulfill.
- **Vendor Assignment Logic:** The platform must execute assignment logic strictly based on the requested service (e.g., locking to specific vendors, routing to an admin desk, or publishing to an open queue).
- **Queue System:** The platform must support a real-time, broadcasted queue for specific services where all eligible vendors can view pending tasks. The first vendor to click "Accept" claims the task exclusively.
- **Service Workflows:** End-to-end workflow states (Submitted -> Paid -> Assigned/Processing -> Vendor Uploaded -> Admin Reviewed -> Completed/Downloaded) must be tracked and logged for all services.
- **Admin Controls:** Admins must possess overwatch capabilities to manually assign vendors, reject vendor uploads (sending them back for correction), and complete the final lifecycle state.
- **Document Upload/Download:** Secure two-way document transfer mechanisms allowing customers to upload requirements and download finalized documents, and vendors to upload fulfilled deliverables.
- **Notifications:** Automated email notifications triggered to vendor pools when a queue-based request is created, and user notifications on order completion.
- **Payment Gateway Integration:** Razorpay integration that mandates customer payment prior to finalization of the request, capturing funds into a central platform account.
- **Vendor Payouts:** A ledger and manual approval UI allowing Admins to log and release payments to vendors post-completion, respecting specific margin rules (e.g., fixed commission splits).

## 8. Service Workflows
- **Stamp Paper Request:** Custom fills form & pays -> Admin reviews -> Admin manually assigns to Vendor -> Vendor uploads document -> Admin reviews -> Completed -> Customer downloads.
- **Company Registration:** Customer submits & pays -> System automatically assigns specifically to Vendor "Prakash" -> Prakash fulfills and uploads -> Admin reviews & releases payout.
- **GST Registration:** Customer submits & pays -> Request enters Admin Manual Queue -> Admin evaluates requirement and manually selects/assigns a vendor from a dropdown list -> Vendor fulfills -> Admin reviews & releases payout.
- **MSME Registration:** Customer submits & pays -> Request is broadcasted to the MSME Vendor Queue -> Notification email sent to all eligible MSME vendors -> First vendor to click "Accept" is assigned the task -> Vendor fulfills -> Admin reviews & releases payout.
- **Notary Service:** Customer submits & pays fixed ₹110 pricing -> Assignment (via defined rule) -> Vendor fulfills -> Admin confirms with client -> Admin releases payout splitting precisely ₹100 to Vendor and logging ₹10 to Platform Commission.

## 9. Vendor Assignment Logic
- **Auto Assignment:** Hardcoded database routing that maps a specific Service ID directly to a single, predetermined Vendor ID (used exclusively for Company Registration targeting "Prakash").
- **Manual Assignment:** Requests halt at the Admin dashboard. The Admin utilizes human judgment to select an appropriate Vendor from a list and assigns the task (used for GST Registration and Legacy Stamp Papers).
- **Queue Based Assignment:** Requests are published to a dashboard accessible by a pool of eligible vendors. It operates on a strictly "First-Come, First-Served" (FCFS) basis. Once a vendor accepts the request, a database lock engages, removing it from the queue for all other vendors (used for MSME Registration).

## 10. Payment Flow
- **Razorpay Payment Flow:** Once a customer's request is successfully completed (or at the prescribed intake step), they are presented with a Razorpay checkout. The payment is finalized, and funds are deposited into the platform's central bank account.
- **Vendor Payout Flow:** The centralized platform acts as an escrow entity. The customer's payment is logged, generating a pending system liability equal to the agreed vendor payout rate (e.g., Notary: ₹100).
- **Admin Payment Release Logic:** The vendor is not paid immediately upon completion of their task. The Admin must first verify the uploaded document and manually contact the client to confirm satisfaction. Only after this confirmation does the Admin click "Release Payment", shifting the payout from "Pending" to "Approved/Released" for final bank settlement.

## 11. Non Functional Requirements
- **Performance:** Queue-based assignment boards must display real-time or near-real-time updates to prevent multiple vendors from attempting to accept the exact same order simultaneously.
- **Security:** Strict Role-Based Access Control (RBAC) ensuring vendors only see data pertaining to their assigned tasks. Secure storage configurations for personal identifiable information (PII) uploaded by customers.
- **Scalability:** The vendor onboarding system and database schema must comfortably support the addition of hundreds of concurrent vendors without degradation in queue broadcast speeds.
- **Availability:** The platform targets 99.9% uptime for the intake forms and payment gateway to ensure no revenue opportunities are missed.

## 12. Assumptions
- Customers will possess the requisite preliminary documents (ID cards, structural deeds) required to initiate the distinct service requests.
- Vendors onboarded to the system possess the legal authority and licensing necessary to fulfill the tasks they are claiming or assigned.
- The platform operates primarily within the Indian jurisdiction, rendering Razorpay INR payments standard and sufficient.

## 13. Risks and Dependencies
- **Risk:** Vendor "task sniping" within the queue-based model where vendors accept tasks they lack the temporal capacity to complete simply to hoard work.
  - *Mitigation:* Implementation of SLA timers or Admin revocation overrides.
- **Dependency:** Seamless uptime and validation responses from the Razorpay API to process checkouts and webhook verifications.
- **Dependency:** The availability of Vendor "Prakash" representing a single point of failure for all Company Registration workflows under the Auto-Assign mandate.

## 14. Future Enhancements
- Implementation of automated, API-driven vendor payout settlements using RazorpayX.
- Integration of a robust internal messaging or ticketing system directly linking Customers to assigned Vendors, supervised by Admins.
- Machine Learning algorithms to replace Manual Assignment by profiling vendor performance matrixes (speed, accuracy) for intelligent routing.
- Vendor performance ratings internally visible to Admins to assist in manual routing decisions.
