-- src/main/resources/db/migration/V2__add_sync_tables.sql

-- Sync tracking table
CREATE TABLE sync_tracker (
    id BIGSERIAL PRIMARY KEY,
    entity_type VARCHAR(100) NOT NULL,
    entity_id BIGINT NOT NULL,
    operation VARCHAR(20) NOT NULL CHECK (operation IN ('CREATE', 'UPDATE', 'DELETE')),
    local_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    remote_timestamp TIMESTAMP,
    status VARCHAR(50) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'SYNCED', 'FAILED')),
    retry_count INTEGER DEFAULT 0,
    error_message TEXT,
    synced_at TIMESTAMP
);

-- Offline data cache
CREATE TABLE offline_cache (
    id BIGSERIAL PRIMARY KEY,
    cache_key VARCHAR(500) UNIQUE NOT NULL,
    data JSONB NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- API call queue for offline mode
CREATE TABLE api_queue (
    id BIGSERIAL PRIMARY KEY,
    endpoint VARCHAR(500) NOT NULL,
    method VARCHAR(10) NOT NULL CHECK (method IN ('GET', 'POST', 'PUT', 'DELETE', 'PATCH')),
    payload JSONB,
    headers JSONB,
    priority INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'QUEUED' CHECK (status IN ('QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED')),
    retry_count INTEGER DEFAULT 0,
    last_attempt TIMESTAMP,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);